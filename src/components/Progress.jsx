function Progress({ current, total }) {
  return (
    <div className="mb-4 text-sm text-gray-600">
      Question {current} of {total}
    </div>
  );
}

export default Progress;
