import { useNavigate } from 'react-router-dom';
import styles from './TicketForm.module.css';
import React, { useEffect, useState, type FormEvent } from 'react';
interface User {
  id: string;
  name: string
}
export function TicketCreateForm() {
  const navigate = useNavigate();

  // 🔴 TODO:
  // 1. set up controlled component state for: title, description, priority, category,
  //    reporterName, reporterEmail, assigneeId
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setpriority] = useState('medium');
  const [category, setCategory] = useState('general');
  const [reporterName, setReporterName] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submit, setSubmit] = useState(false);
  // 2. fetch users from GET /api/users on mount (for the assignee dropdown)
  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch('http://localhost:4001/api/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching:', err)
      }
    } fetchUsers();
  }, [])


  // 3. on submit, POST to /api/tickets with the form data,
  //    then navigate to /tickets/:id using the returned ticket id
  // 4. track a "submitting" state — disable the submit button and show "Saving..." while the request is in flight
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmit(true);
    setError(null);
    const formData = {
      title, description, priority, category,
      reporterName, reporterEmail, assigneeId: assigneeId || null
    };
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to create ticket');
      const data = await response.json();
      navigate(`/tickets/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'fetch failed')
      setSubmit(false);
    }
  }
  return (
    <div className={styles.container}>
      <h1>Create Ticket</h1>

      <form className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="title">Title *</label>
          <input id="title" type="text" />
        </div>

        <div className={styles.field}>
          <label htmlFor="description">Description *</label>
          <textarea id="description" rows={6} />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="priority">Priority *</label>
            <select id="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="category">Category *</label>
            <select id="category">
              <option value="bug">Bug</option>
              <option value="feature_request">Feature Request</option>
              <option value="question">Question</option>
              <option value="account_issue">Account Issue</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label htmlFor="reporterName">Reporter Name *</label>
            <input id="reporterName" type="text" />
          </div>

          <div className={styles.field}>
            <label htmlFor="reporterEmail">Reporter Email *</label>
            <input id="reporterEmail" type="email" />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="assigneeId">Assignee</label>
          <select id="assigneeId">
            <option value="">Unassigned</option>
            {/* render one <option> per user from the fetched users list */}
          </select>
        </div>

        <div className={styles.actions}>
          <button type="submit" className={styles.submitButton}>
            Create Ticket
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
