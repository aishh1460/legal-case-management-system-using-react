import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCase, updateCase } from '../redux/caseSlice';
import { useNavigate, useParams } from 'react-router-dom';

const empty = {
  caseNumber: '',
  caseType: '',
  assignedLawyer: '',
  status: 'Open',
  courtDate: '',
  notes: ''
};

export default function CaseForm({ editMode }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cases = useSelector(s => s.cases.list);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editMode && id) {
      const c = cases.find(x => x.id === id);
      if (c) setForm({ ...c });
      else navigate('/');
    }
  }, [editMode, id, cases, navigate]);

  function validate() {
    const e = {};
    if (!form.caseNumber.trim()) e.caseNumber = 'Required';
    if (!form.caseType.trim()) e.caseType = 'Required';
    if (!form.assignedLawyer.trim()) e.assignedLawyer = 'Required';
    return e;
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    if (editMode) {
      dispatch(updateCase(form));
    } else {
      dispatch(addCase(form));
    }
    navigate('/');
  }

  return (
    <form className="case-form" onSubmit={handleSubmit}>
      <h2>{editMode ? 'Edit Case' : 'Add Case'}</h2>
      <label>
        Case Number
        <input value={form.caseNumber} onChange={e => setForm({...form, caseNumber: e.target.value})} />
        {errors.caseNumber && <small className="err">{errors.caseNumber}</small>}
      </label>

      <label>
        Case Type
        <input value={form.caseType} onChange={e => setForm({...form, caseType: e.target.value})} />
        {errors.caseType && <small className="err">{errors.caseType}</small>}
      </label>

      <label>
        Assigned Lawyer
        <input value={form.assignedLawyer} onChange={e => setForm({...form, assignedLawyer: e.target.value})} />
        {errors.assignedLawyer && <small className="err">{errors.assignedLawyer}</small>}
      </label>

      <label>
        Status
        <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
          <option>Open</option>
          <option>Ongoing</option>
          <option>Closed</option>
        </select>
      </label>

      <label>
        Court Date
        <input type="date" value={form.courtDate ? form.courtDate.split('T')[0] : ''} onChange={e => setForm({...form, courtDate: e.target.value})} />
      </label>

      <label>
        Notes
        <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
      </label>

      <div className="form-actions">
        <button type="submit">{editMode ? 'Save' : 'Create'}</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </div>
    </form>
  );
}
