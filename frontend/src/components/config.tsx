export const config = {
    headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
    }
};