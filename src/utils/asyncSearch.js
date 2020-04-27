export const asyncSearch = async (searchText) => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/users/1/todos',
  );
  const data = await response.json();
  const suggestions = data.reduce((acc, current) => {
    acc.push(current.title.split(' ')[0]);
    return acc;
  }, []);

  const filteredOptions = suggestions.filter(
    (optionName) =>
      optionName.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
  );

  return filteredOptions;
};
