export async function isLoggedIn() {
  try {
    const res = await fetch('/api/v1/user/isLoggedIn', { credentials: 'include' });

    if (res.status !== 200) return false;

    return true;
  } catch (err) {
    console.log(err.message);
  }
}

export async function isAdmin() {
  try {
    const res = await fetch('/api/v1/user/', { credentials: 'include' });

    if (res.status !== 201) return false;

    return true;
  } catch (error) {
    console.log(error.message);
  }
}
