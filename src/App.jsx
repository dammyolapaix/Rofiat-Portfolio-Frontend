import { useEffect, useState } from "react";

function App() {
  const [projects, setProjects] = useState(null);

  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);

  const getProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects");
      const data = await response.json();
      console.log(data);
      setProjects(data.projects);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const newProject = {
      name: name,
      description: description,
    };

    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <h1>Add project</h1>
        <input
          type="text"
          name=""
          id=""
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit">Add Project</button>
      </form>

      <h1>Projects</h1>
      {projects &&
        projects.length >= 1 &&
        projects.map((project) => (
          <div>
            <ul>
              <div style={{ paddingBottom: "10px" }}>
                <li>name: {project.name}</li>
                <li>description: {project.description}</li>
              </div>
            </ul>
          </div>
        ))}
    </div>
  );
}

export default App;
