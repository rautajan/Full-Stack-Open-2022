const CountryFilter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      find countries
      <input value={newFilter} onChange={handleFilterChange} />
    </div>
  );
};
export default CountryFilter;
