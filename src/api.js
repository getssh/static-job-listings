export async function fetchData() {
  try {
    const response = await axios.get('https://demo8445262.mockable.io/joblisting');
    return response.data;
  } catch (error) {
    console.error('Data loading error:', error);
  }
}
