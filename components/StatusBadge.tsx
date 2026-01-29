'use client';

import { Submission } from '@/lib/types';

interface StatusBadgeProps {
  status: Submission['status'];
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const styles: Record<Submission['status'], string> = {
    'pending': 'bg-amber-100 text-amber-800 border-amber-200',
    'in-review': 'bg-blue-100 text-blue-800 border-blue-200',
    'processed': 'bg-purple-100 text-purple-800 border-purple-200',
    'completed': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'rejected': 'bg-red-100 text-red-800 border-red-200'
  };

  const labels: Record<Submission['status'], string> = {
    'pending': 'Pending',
    'in-review': 'In Review',
    'processed': 'Processed',
    'completed': 'Completed',
    'rejected': 'Rejected'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
};

export default StatusBadge;
