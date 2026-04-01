import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiPlay, FiPause, FiRefreshCw, FiLayers, FiBriefcase, FiUser, FiActivity, FiSearch, FiCalendar, FiFlag, FiFolder, FiPlus, FiSave, FiCheck, FiTrash2, FiEdit2, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Auth warning state
  const [showAuthWarning, setShowAuthWarning] = useState(false);

  // State
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('taskify_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [filter, setFilter] = useState('all');
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  
  // Input Form State
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [taskCategory, setTaskCategory] = useState('Work');
  
  // Pomodoro State
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerRef = useRef(null);

  // Drag and drop state
  const [draggedItemId, setDraggedItemId] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('taskify_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Pomodoro Effect
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(timerRef.current);
      setIsTimerRunning(false);
      alert('Pomodoro session completed! Take a break.');
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning, timeLeft]);

  // Derived Stats
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;
  
  const categoriesCount = {
    All: tasks.length,
    Work: tasks.filter(t => t.category === 'Work').length,
    Personal: tasks.filter(t => t.category === 'Personal').length,
    Health: tasks.filter(t => t.category === 'Health').length
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning,';
    if (hour < 18) return 'Good Afternoon,';
    return 'Good Evening,';
  };

  // Handlers
  const toggleTimer = () => setIsTimerRunning(!isTimerRunning);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(25 * 60);
  };
  const formatTime = (secs) => `${String(Math.floor(secs / 60)).padStart(2, '0')}:${String(secs % 60).padStart(2, '0')}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Auth guard: check if user is logged in
    if (!isAuthenticated) {
      setShowAuthWarning(true);
      setTimeout(() => {
        navigate('/login');
      }, 2500);
      return;
    }

    if (!title.trim()) return;

    if (editingId) {
      setTasks(tasks.map(t => t.id === editingId ? { ...t, title, dueDate, priority, category: taskCategory } : t));
      setEditingId(null);
    } else {
      const newTask = {
        id: Date.now().toString(),
        title,
        dueDate,
        priority,
        category: taskCategory,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTasks([newTask, ...tasks]);
    }

    setTitle('');
    setDueDate('');
  };

  const editTask = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDueDate(task.dueDate || '');
    setPriority(task.priority);
    setTaskCategory(task.category);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setTitle('');
    }
  };

  // Drag and Drop
  const handleDragStart = (e, id) => {
    setDraggedItemId(id);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, targetId) => {
    e.preventDefault();
    if (draggedItemId && draggedItemId !== targetId) {
      const draggedIndex = tasks.findIndex(t => t.id === draggedItemId);
      const targetIndex = tasks.findIndex(t => t.id === targetId);
      
      const newTasks = [...tasks];
      const [removed] = newTasks.splice(draggedIndex, 1);
      newTasks.splice(targetIndex, 0, removed);
      
      setTasks(newTasks);
    }
    setDraggedItemId(null);
  };

  // Filtering
  const displayedTasks = tasks.filter(task => {
    if (category !== 'All' && task.category !== category) return false;
    if (filter === 'active' && task.completed) return false;
    if (filter === 'completed' && !task.completed) return false;
    if (search && !task.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="app-container glass"
    >
      {/* Sidebar */}
      <aside className="sidebar w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-[var(--glass-border)] p-8 flex flex-col gap-10 overflow-y-auto">
        <div className="pomodoro-widget glass-panel text-center">
          <h4 className="text-[var(--text-secondary)] font-semibold text-sm uppercase tracking-wider mb-2">Focus Timer</h4>
          <div className="text-5xl font-bold text-indigo-500 tabular-nums my-4 tracking-tight drop-shadow-sm">{formatTime(timeLeft)}</div>
          <div className="flex justify-center gap-4">
            <button onClick={toggleTimer} className="w-12 h-12 rounded-full bg-[var(--input-bg)] text-indigo-500 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors shadow-sm text-xl border border-[var(--glass-border)]">
              {isTimerRunning ? <FiPause /> : <FiPlay className="ml-1" />}
            </button>
            <button onClick={resetTimer} className="w-12 h-12 rounded-full bg-[var(--input-bg)] text-[var(--text-secondary)] flex items-center justify-center hover:bg-[var(--text-secondary)] hover:text-white transition-colors shadow-sm text-xl border border-[var(--glass-border)]">
              <FiRefreshCw />
            </button>
          </div>
        </div>

        <div className="hidden lg:block">
          <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-4">Categories</h3>
          <ul className="flex flex-col gap-2">
            {[
              { name: 'All', icon: <FiLayers /> },
              { name: 'Work', icon: <FiBriefcase /> },
              { name: 'Personal', icon: <FiUser /> },
              { name: 'Health', icon: <FiActivity /> }
            ].map(cat => (
              <li 
                key={cat.name}
                onClick={() => setCategory(cat.name)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all font-medium border border-transparent ${category === cat.name ? 'bg-indigo-500 text-white shadow-md' : 'text-[var(--text-secondary)] hover:bg-[var(--glass-bg)] hover:border-[var(--glass-border)]'}`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.name} Tasks</span>
                <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-bold ${category === cat.name ? 'bg-white/20' : 'bg-[var(--input-bg)]'}`}>
                  {categoriesCount[cat.name]}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="glass-panel text-center p-4">
            <h5 className="text-2xl font-bold text-indigo-500">{completedCount}</h5>
            <p className="text-xs text-[var(--text-secondary)] font-medium mt-1 uppercase">Completed</p>
          </div>
          <div className="glass-panel text-center p-4">
            <h5 className="text-2xl font-bold text-orange-500">{pendingCount}</h5>
            <p className="text-xs text-[var(--text-secondary)] font-medium mt-1 uppercase">Pending</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-8 lg:p-10 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{getGreeting()}</h1>
            <p className="text-[var(--text-secondary)] text-lg mt-1 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          
          <div className="flex items-center bg-[var(--input-bg)] rounded-2xl px-4 py-2 w-full md:w-64 border border-[var(--glass-border)] shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <FiSearch className="text-[var(--text-secondary)] text-lg" />
            <input 
              type="text" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="bg-transparent border-none outline-none w-full ml-3 text-sm text-[var(--text-primary)]"
            />
          </div>
        </header>

        {/* Auth Warning Banner */}
        <AnimatePresence>
          {showAuthWarning && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mb-6 p-5 rounded-2xl border-2 border-orange-400/50 shadow-lg"
              style={{ background: 'linear-gradient(135deg, rgba(251,146,60,0.15), rgba(251,113,133,0.15))' }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <FiAlertCircle className="text-orange-500 text-2xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-orange-500 mb-1">Authentication Required</h3>
                  <p className="text-[var(--text-secondary)] text-sm">
                    Please{' '}
                    <span onClick={() => navigate('/login')} className="text-indigo-500 font-semibold cursor-pointer hover:underline">Login</span>
                    {' '}or{' '}
                    <span onClick={() => navigate('/register')} className="text-indigo-500 font-semibold cursor-pointer hover:underline">Sign Up</span>
                    {' '}first to add tasks. Redirecting you shortly...
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Task Input */}
        <section className="glass-panel mb-8 border border-[var(--glass-border)] shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex">
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?" 
                required 
                className="flex-1 bg-[var(--input-bg)] border border-[var(--glass-border)] rounded-xl px-5 py-3 text-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-[var(--text-primary)] font-medium"
              />
              <button type="submit" className="btn-primary ml-4">
                {editingId ? <><FiSave className="mr-2" /> Update</> : <><FiPlus className="mr-2" /> Add Task</>}
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-[var(--input-bg)] px-4 py-2 rounded-lg border border-[var(--glass-border)] text-sm">
                <FiCalendar className="text-[var(--text-secondary)]" />
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="bg-transparent border-none outline-none cursor-pointer text-[var(--text-primary)]" />
              </div>
              <div className="flex items-center gap-2 bg-[var(--input-bg)] px-4 py-2 rounded-lg border border-[var(--glass-border)] text-sm">
                <FiFlag className="text-[var(--text-secondary)]" />
                <select value={priority} onChange={e => setPriority(e.target.value)} className="bg-transparent border-none outline-none cursor-pointer text-[var(--text-primary)]">
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              <div className="flex items-center gap-2 bg-[var(--input-bg)] px-4 py-2 rounded-lg border border-[var(--glass-border)] text-sm">
                <FiFolder className="text-[var(--text-secondary)]" />
                <select value={taskCategory} onChange={e => setTaskCategory(e.target.value)} className="bg-transparent border-none outline-none cursor-pointer text-[var(--text-primary)]">
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Health">Health</option>
                </select>
              </div>
            </div>
          </form>
        </section>

        {/* Task List Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{category === 'All' ? 'All Tasks' : `${category} Tasks`}</h2>
          <div className="flex gap-2 bg-[var(--glass-bg)] p-1 rounded-xl border border-[var(--glass-border)] shadow-sm">
            {['all', 'active', 'completed'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold capitalize transition-all ${filter === f ? 'bg-[var(--input-bg)] text-[var(--text-primary)] shadow-sm' : 'text-[var(--text-secondary)] hover:bg-[var(--glass-bg)]'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <ul className="flex flex-col gap-4">
          <AnimatePresence>
            {displayedTasks.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-20 flex flex-col items-center justify-center opacity-70"
              >
                <img src="https://illustrations.popsy.co/amber/keynote-presentation.svg" alt="Empty" className="w-48 mb-6" />
                <h3 className="text-xl font-bold mb-2">You're all caught up!</h3>
                <p className="text-[var(--text-secondary)]">Enjoy your beautiful day.</p>
              </motion.div>
            ) : (
              displayedTasks.map(task => (
                <motion.li 
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, task.id)}
                  className={`task-item group ${draggedItemId === task.id ? 'opacity-50' : ''}`}
                  style={{ borderLeft: `5px solid var(--priority-${task.priority})` }}
                >
                  <div 
                    onClick={() => toggleTask(task.id)}
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors flex-shrink-0 ${task.completed ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-indigo-400 text-transparent hover:bg-indigo-100'}`}
                  >
                    <FiCheck className="text-sm" />
                  </div>
                  
                  <div className="flex-1 flex flex-col ml-2">
                    <span className={`text-lg font-medium transition-colors ${task.completed ? 'line-through text-[var(--text-secondary)] opacity-60' : 'text-[var(--text-primary)]'}`}>
                      {task.title}
                    </span>
                    <div className="flex gap-4 text-xs font-medium text-[var(--text-secondary)] mt-1 opacity-80">
                      {task.dueDate && <span className="flex items-center gap-1"><FiCalendar /> {new Date(task.dueDate).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>}
                      <span className="flex items-center gap-1"><FiFolder /> {task.category}</span>
                      <span className="flex items-center gap-1 capitalize"><FiFlag /> {task.priority}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => editTask(task)} className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-indigo-500 hover:bg-indigo-100 transition-colors">
                      <FiEdit2 />
                    </button>
                    <button onClick={() => deleteTask(task.id)} className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-red-500 hover:bg-red-100 transition-colors">
                      <FiTrash2 />
                    </button>
                  </div>
                </motion.li>
              ))
            )}
          </AnimatePresence>
        </ul>

      </main>
    </motion.div>
  );
}

export default Dashboard;
