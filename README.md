# MWC22-cli

Get information about the Mobile World Congress from your shell. This CLI package provides access to the database of developers attending the MWC. You can use it to sign single or groups of users to the event, check the list of attendants and get basic information about the congress.

This package has been developed from scratch by [Adriana Martín de Aguilera (amda)](https://github.com/amda-phd/) in February 2022.

## Goals
`MWC22-cli` has been created to meet the following specific needs:
1. Create a developers database containing each attendant's basic contact information, their category and the dates that they intend to attend to the congress.
2. Provide the ability to read a list of attendants from a JSON file and record them in the newly created database.
3. Offer basic information about the Mobile World Congress event.
4. Display a list of developers registered to attend to the conferences.
5. Allow signing up single developers to the attendants list from the command line.

## Technology
The main technologies employed to develop `MWC22-cli` are:
- `Node.js`: This is the programming language that the package is written with. We have used the current LTS version of Node, which is 16.0.0+ at the time of writting this lines.
- `MongoDB`: Being one of the tasks in this project the creation of a developers database, our choice to do so has been the popular non-relational database MongoDB. The reason to do so is MongoDB's flexibility to modify model schemas, in case new requirements need to be added in the future.
- `Git`: Version control of the repository has been carried out using Git, with Github as remote.

### Other development specific technology choices
- `ESlint`: This popular solution has been used along the project to monitor and sanitize code automatically. Combining it with `Prettier` provides not only cleaner, but also more coherent and readable code.
- `Jest`: Unit testing is performed with one of the most popular solutions to do so in JavaScript environments.
- `Husky`: As a complement to `Git`, we have employed this tool to make use of `Git`'s hooks. For a healthy development process, the hooks integrated in this project's version control have been:
  - `pre-commit`: Analyzes the code in search for `ESLint` issues. The commit can only take place if no linting errors are found. Also, if so, all the code gets prettified before commiting, and the todo.md document gets updated with any new **TODOs** written as result of the development process.
  - `pre-push`: The push can only happen if the complete unit tests suite is passed.

## Usage
### Pre-requirements
In order to use `MWC22-cli` you need to:
- Have Node.js version 16.0.0+ installed.
- Have MongoDB installed and running.
- An accesible database in a MongoDB instance, local or online, that you have permission to query and modify.

### Installation
1. Download this package. To do so, run
```
git clone https://github.com/amda-phd/hackaton-4YFN.git
```
Then move to the repository's root directory.

2. In order to execute the package, a configuration file needs to be provided. For security reasons, such file is not included in the repository. But any user can add their own:
    - Create a `config.json` file in the project's root.
    - Fill it with the only entry `MONGO_URL`. Store here the url address to the MongoDB instance database that you plan to use `MWC22-cli` with.
    - You can use any online Mongo cluster that you have access to to execute this package from the cloud.
    - If you plan to connect to a local database, your config file will look like:
  ```
{
    "MONGO_URL": "mongodb://localhost:27017/[NAME-OF-YOUR-DATABASE]"
}
  ```
3. From the project's root, install the package globally in your device for easier access from the command line. To do so, run
```
npm install -g .
```
4. Invoque the program by executing `mwc22` in your terminal. This will display indications about how to use the package.

### Commands
`MWC22-cli` includes a rich help functionality designed to guide the user.
- General information about the available commands can be accessed by typing `mwc22 -h` or `mwc --help` in your terminal.
- Specific information about the arguments and/or options expected with each command can be displayed running `mwc22 [commandName] -h`. For example, `mwc22 addDeveloper -h` will show and explain all the options needed in order to register a new developer in the database.

### Usage remarks
**Input validation** is performed when adding new registers to the Developers database. Specifically, each new register will include the following fields and restrictions:
- Name: Cannot be empty and is limited in size.
- Email: Only valid and unique email addresses can be added.
- Telephone number: Only valid telephone numbers can be stored in the database. Phone numbers missing data or their corresponding international code will produce an error and prevent the new developer from being registered.
- Category: Only one of Back, Front, Data or Mobile can be chosen.
- Dates: An array containing the dates that the developer will attend to the fair. If this parameter is not provided, the developer will be signed as an attendant for the four days of the congress. Providing a date outside the expected limits of the fair (from 28th of February to the 3rd of March 2021) will trigger an error.

When attempting to **import users from a JSON file** (command `importJSON`), the following requirements must be met:
- The JSON file must contain an **array of JSON instances** with the following format:
```
[
	{
		"name": "Harrison Edwards",
		"email": "sapien.cras.dolor@icloud.couk",
		"category": "Front",
		"phone": "465-4617",
		"date": "Mar 3, 2021"
	}
]
```
- Invalid names, emails, categories, phone numbers or dates will display a WARNING message and won't be added to the database.
- Duplicated emails will be checked to review whether a second date needs to be added to the original entry. If it is, the developer's register will be updated automatically.

## Project / task specific remarks
- A JSON file containing an array of developers to be added to the database was provided. But the dates contained in it were a little confusing, as they clearly corresponded to the 2021 edition of MWC. As a result, the package has been adapted to record dates between 2021-02-28 and 2021-03-03, which is a little confusing, as the requirements seemed to imply that the date limits were expected to correspond to 2022.
- A list of future features that would improve the project if implemented can be found in the [todo.md](https://github.com/amda-phd/mwc22-cli/todo.md) file.
