toast.success('Success message', {
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,  // closes after 3 seconds
});


function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav>
      {user ? (
        <>
          <button onClick={() => navigate('/dashboard')}>Dashboard</button>
          {/* Other links */}
        </>
      ) : (
        <button onClick={() => navigate('/login')}>Login</button>
      )}
    </nav>
  );
}