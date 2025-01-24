import { createContext, useContext } from 'react';
const myContext = createContext(null);

function MyProviderContext({ children }) {
  const cat ={
    name: 'Keks',
    title: 'Html'
  };
  return(
  <myContext.Provider value={cat}>
    {children}
  </myContext.Provider>);
}

function Test () {
  const { name, title } = useContext(myContext);
  return(
    <div>{name}-{title}</div>
  );
};

function Context() {
  return(
    <MyProviderContext>
      <form>
      <Test />
      <p>Включи меня</p>
       <input placeholder="Заполни"></input>
    </form>
    </MyProviderContext>

  );
}


export { Context };
