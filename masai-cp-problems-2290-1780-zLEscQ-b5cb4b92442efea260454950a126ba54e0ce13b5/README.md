<h1 style="color:black">
Express Super Team Server
</h1>

<h2 style="color:#215dc8">
Maximum Marks - 8 (Rubrics as per the problem statement)
</h2>

```
✅ able to submit the application - 1 mark (minimum score)
✅ should able to post the data and send the appropriate response on hitting at POST "/add/hero" - 1 mark
✅ should able to get the data and send the appropriate response on hitting at GET "/heroes" - 0.5 mark
✅ should be able to add villain for the hero PATCH "/update/villain/:hero_id" route - 1.5 mark
✅ should be able to delete the hero DELETE "/delete/hero/:hero_id" route - 1.5 mark
✅ "logger" middleware should be working fine - 0.5 mark
✅ "auth" middleware should be working fine - 1 mark
✅ "addID" middleware should be working fine - 1 mark
```

Initialize a backend project using the right command for it and create an express app.

There will be a `db.json` file containing the sample data, which you will be using as a database for performing CRUD operations, Following is the sample structure:

```
{
    "heroes": [
        {
            "id":1,
            "name": "IronMan",
            "powers": [
                "robot",
                "money"
            ],
            "health": 33,
            "villains": [
                {
                    "name": "Mandarin",
                    "health": 50
                }
            ]
        }
    ]
}
```

The application should provide the following functionalities through API endpoints:

<h2 style="color:#215dc8">
1. Add a new hero
</h2>

- Endpoint: `POST` `/add/hero`
- Description: Adds a new hero to the system.

<p style="color:#215dc8">
Request Body:
</p>

It should contain the details of the hero that you want to add.

```
{
      name: "Captain Marvel",
      powers: ["superhuman strength", "energy projection", "flight"],
      health: 95,
      villains: [
        {
          name: "Yon-Rog",
          health: 60,
        }
      ],
}
```

<p style="color:#215dc8">
Response:
</p>

```
OK: Returns the details of all the heroes along with the newly updated one.
err: Returns the error
```

- Middleware: `addID` - Generates a new id for the hero and add it to the request body, you need to see if the last hero's `id` is `3` for the new hero the `id` should be `4` and so on.

<h2 style="color:#215dc8">
2. Retrieve details of all heroes
</h2>

- Endpoint: `GET` `/heroes`
- Description: Retrieves all the heroes.

<p style="color:#215dc8">
Response:
</p>

```
OK: Returns the details of all the heroes.
err: Returns the error
```

<h2 style="color:#215dc8">
3. Update villains for a hero
</h2>

- Endpoint: `PATCH` `/update/villain/:hero_id`
- Description: Updates the villains for a specific hero.
- URL Parameter: hero_id - Unique id of the hero.

<p style="color:#215dc8">
Request Body:
</p>

It should contain the details of the villain that you want to add for a hero.

```
{
    name: 'King Peen',
    health: 20
}
```

<p style="color:#215dc8">
Response:
</p>

```
In case of hero not found with hero_id - { message: "Hero not found"}

OK: Returns the updated hero data only, not all the heroes.
err: Returns the error
```

- Middleware: auth - Provides authentication for the endpoint. If the `role` and `pass` are `admin` and `saveEarth` respectively then this route should work otherwise following response should be sent:

```
{ message: "Not Authorized" }
```

<h2 style="color:#215dc8">
4. Delete a hero:
</h2>

- Endpoint: `DELETE` `/delete/hero/:hero_id`
- Description: Deletes a specific hero.
- URL Parameter: hero_id - Unique id of the hero.

<p style="color:#215dc8">
Response:
</p>

```
OK: Returns the details of all the heroes after deleting this specific one.
err: Returns the error
```

- Middleware: auth - Provides authentication for the endpoint. If the `role` and `pass` are `admin` and `saveEarth` respectively then this route should work otherwise following response should be sent:

```
{ message: "Not Authorized" }
```

<h2 style="color:#215dc8">
Middleware Details
</h2>

1. `addID:`

- Description: Generates a unique id for the hero before adding it to the system.

2. `logger:`

- Logs the API endpoint along with the method at which client has made the request, with a proper time stamp

```
URL: /heroes, Method: GET, Timestamp: Fri May 19 2023 02:24:57 GMT+0530 (India Standard Time)
URL: /add/hero, Method: POST, Timestamp: Fri May 19 2023 04:56:24 GMT+0530 (India Standard Time)
```

3. `auth:`

- Provides authentication for the protected endpoints (`update/villain/:hero_id` and `delete/hero/:hero_id`). It ensures that the user is authenticated before allowing access to these endpoints.

<h2 style="color:#215dc8">
Installation
</h2>

- Use node version(LTS) should be `v16.16.0`
- Don't change/override package.json
- please make sure you do not push package-lock.json

```
- run `npm install --engine-strict` to install the node modules.

// complete functions

// test locally
npm run test
`make sure when you test locally server is not running locally.`

```

<h2 style="color:#215dc8">
Requirements
</h2>

- The code should be written in Node.js.
- Use the built-in modules and external modules that are required.
- Add comments throughout your code to explain the logic behind each step

<h2 style="color:#215dc8">
Evaluation Criteria
</h2>

- Correct implementation of all the routes
- Proper handling of edge cases
- Code readability and organization
- Comments explaining the logic behind each step

<h2 style="color:red">
General guidelines
</h2>

- The system on cp.masaischool.com may take between 1-20 minutes for responding,
- so we request you to read the problem carefully and debug it before itself
- we also request you not just submit it last minute
- try to keep one submission at a time
- Should clean/delete the `logs.txt` each and every time before testing.
- should keep the `db.json` as it was in initial condition, which means we have to remove the added data and make the `db.json` as it was in initial state before testing.
