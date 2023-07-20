import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

const Register = ()=>{

    const [email, setEmail] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
  
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
      e.preventDefault(); // Empêche le rechargement de la page
  
      try {
        const response = await axios.post('http://localhost:3000/api/users/register', {
          role,
          nom,
          prenom,
          email,
          password,
        }, { withCredentials: true });
  
        console.log(response.data);
        navigate("/CONNEXION")
  
      } catch (error) {
        console.log(error.response.data.message);
        setErr(error.response.data.message);
      }
    };
  
return (
<section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Link href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          SalleEvent    
      </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-3" onSubmit={handleSubmit}>
                
              <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
<select value={role} onChange={(e)=>setRole(e.target.value)} id="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option disabled value=''>select your Role</option>
  <option value="gerant">gerant</option>
  <option value="utilisateur">utilisateur</option>
  <option value="admin">admin</option>

</select>


             
                    <div>
                      <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Nom</label>
                      <input type="text" value={nom} onChange={(e)=> setNom(e.target.value)} name="email" id="nom" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Prenom</label>
                      <input type="text" value={prenom} onChange={(e)=> setPrenom(e.target.value)} name="email" id="prenom" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Email</label>
                      <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <button type="submit" className="btn btn-primary btn-block btn-sm">Connecter</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <Link to="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
)
}

export default Register;