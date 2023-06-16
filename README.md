Setup 

1. Create a table called sss or modify the query in subscriptions.jsx (table should only have a coloumn "id" )
2. pass the correct admin secret on link.js
3. to add more subscriptions modify the following from index.js

``` {[...Array(100).keys()].map((id) => (
      <Subscriptions {...{ id }} />
    ))}

```


4. Note: this setup may not be apt for load test - as there is a UI dependancy


How to Run 

npm install
npm start 
