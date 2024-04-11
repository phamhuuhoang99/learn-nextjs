import useSWR from 'swr';

interface StudentDetailProps {
  studentId: string;
}

const StudentDetail = ({ studentId }: StudentDetailProps) => {
  const { data, error, mutate, isValidating } = useSWR(`/students/${studentId}`, {
    revalidateOnFocus: false,
  });
  function handleMutateClick() {
    mutate({ name: 'easy front' }, true);
  }

  return (
    <div>
      {data?.name || 'N/A'}
      <button onClick={handleMutateClick}>Mutate</button>
    </div>
  );
};

export default StudentDetail;
