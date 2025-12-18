import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCase, updateCase } from '../redux/caseSlice';

export default function CaseDetails() {
  const { id } = useParams();
  const caseItem = useSelector(s => s.cases.list.find(x => x.id === id));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!caseItem) return <div>Case not found</div>;

  const changeStatus = (newStatus) => {
    dispatch(updateCase({...caseItem, status: newStatus}));
  };

  return (
    <div className="case-details">
      <h2>Case {caseItem.caseNumber}</h2>
      <p><strong>Type:</strong> {caseItem.caseType}</p>
      <p><strong>Assigned Lawyer:</strong> {caseItem.assignedLawyer}</p>
      <p><strong>Status:</strong> {caseItem.status}</p>
      <p><strong>Court Date:</strong> {caseItem.courtDate ? new Date(caseItem.courtDate).toLocaleDateString() : '-'}</p>
      <p><strong>Notes:</strong><br/>{caseItem.notes || '-'}</p>

      <div className="detail-actions">
        <button onClick={() => navigate(`/edit/${caseItem.id}`)}>Edit</button>
        <button onClick={() => {
          if (window.confirm('Delete this case?')) {
            dispatch(deleteCase(caseItem.id));
            navigate('/');
          }
        }}>Delete</button>

        {caseItem.status !== 'Closed' && <button onClick={() => changeStatus('Closed')}>Mark Closed</button>}
        {caseItem.status !== 'Ongoing' && <button onClick={() => changeStatus('Ongoing')}>Mark Ongoing</button>}
        {caseItem.status !== 'Open' && <button onClick={() => changeStatus('Open')}>Mark Open</button>}
      </div>
    </div>
  );
}
