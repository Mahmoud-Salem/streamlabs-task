# StreamLabs Task

This task aims to build a website that get some data and analytics of twitch streamers and games

## Project Setup 

### To run the project run this command ( docker should be installed, and the callback for the authentication in frontend should change.)
```
    sudo docker-compose up --d --build; sudo docker-compose exec backend npm run dev:migrate
```

### Public link for the service 

    https://streamlabsfrontend.vercel.app/
you can also access the api from 
    https://3.144.93.219:443/



### Overview
 ```
    The web app consists of 3 parts:
    
        1- Database : the database is postgresql with prisma as an ORM. It consists of two main tables which are users and streams
            for each user we have an id as primary key and username which is the twitch username for the user, the streams table
            has the channel name or the streamer username, number of current viewers and the game or category of the current stream.

        2- Backend : the backend is developed with node.js with express as framework also eslint as linter. it follows the rest api 
            architecture for computing every requirement of the task as two routes one as SQL query and one as coding. For authentication
            it request a twitch token from the user, validate it and get the username from twitch, then it generates a jwt token for the user
            to be used for the user to view each functionality and it expires in 1 hour or if the user logged out.

        3- Frontend : the frontend is developed using react.js using functions and hooks for authentication in direct the user to authenticate 
            with twitch to get a token and then validate it with the backend and get a jwt token. Then it view for user each functionality to use.

```   



## Future Works/ Limitations
    Due to limitation of time : 
        * There is no time for making tests for the backend server but usually I use unit/integration tests using JEST framework.
        * The frontend is not the best but I am actually applying for the backend so I spent more time on it.
        * We can get more info about the user to create full profile for him in the database as username,image,email,..etc to be viewed in the frontend.
        * Pagination could be done, however the response size was not the big as we have only small data (1000 streams with 3 rows for every stream),
            in this case it can be done in the frontend just to make the UI/UX better.
    Choices :
        * Using Javascript over Typescript : 
            as we are using FP, TS does not have a greater advantage over JS as the code will only uses functions not OOP, and it will just create overhead to keep track of all type and TS compilation time.
        * Using FP over OOP :
            the service required in this task is based on calculating some results over the data, which is more of a definiation of FP than OOP as we do not have relations/models or related factors that needed to be combined..  

## INFO 
    Name : Mahmoud Salem
    Email : Salem.mahmoud1996@gmail.com
    Position : Backend Engineer
