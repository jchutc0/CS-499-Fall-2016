#Recompiling the Web-based Audio Frequency Analyzer
Some of these steps may be done in other ways, but this is one way to recompile
the Web-based Audio Frequency Analyzer to make modified code work. We tested
them on Windows and macOS.

##Git Bash
macOS and most Linux distributions feature bash as a command-line interpreter
through Terminal (macOS) or sometimes Console. With those operating systems,
this is not necessary. It was recommended on Windows by an online class, but
may not be necessary if the other utilities operate through a DOS shell/
Command Prompt.

1. Go to [git-scm](https://git-scm.com)
2. The main page should detect your OS and show you the appropriate downloader.
Click that.
3. Run the installer it downloads. On Linux or Mac, apparently, all the default
options are perfect. On Windows, in the "Select Components" screen, the
instructor in my videos advised the checkboxes be the same as what he’s seeing,
so here they are:
* (uncheck) Additional icons
* (uncheck) On the Desktop
* (check) Windows Explorer integration
* (check) Git Bash Here
* (check) Git GUI Here
* (check) Associate .git* configuration files with the default text editor
* (check) Associate .sh files to be run with Bash
* (uncheck) Use a TrueType font in all console windows
* In the "Adjusting your PATH environment" screen, he advised selecting the
"Use Git from Git Bash only" radio button. Otherwise, use the defaults.
4. In your Windows search bar, search for `Git Bash`, and you should be able
to run that and open a Bash shell.

##Node.js
Node.js installs the Node Package manager (npm) and the Node.js utility (node).
This project uses both.

To install Node.js:

1. Go to: [Node.js](https://nodejs.org/)
2. Download the version for your OS. The instructor used the link on the right
with the latest features. For the Mac (maybe for other OSes), it’s v6.8.1.
3. Run the installer. Use the default options.
4. Test that it worked. Go into the command prompt (Terminal/Console/Git Bash)
and run `node -v` to make sure you get a version number back. Also run `npm -v`
to get a version number for npm.

##Project Setup
Assuming you have the project on your local machine, there are only a few more
things involved in getting the project running.

1. Install webpack from npm. The command is `sudo npm install -g webpack` in
a bash shell. `sudo` gives elevated (admin) rights to a command; `npm` is the
Node Package Manager that manages packages for node; `install` means we want to
install a package; `-g` means we want to install is globally and not just for
one project. We need that since webpack is a command line utility. Finally,
`webpack` is the package. This installs the latest version of webpack (1.13.2
right now) and all its dependencies. When it’s done, you’ll see all the nice
stuff it installed for you. The webpack command takes all the .jsx files we
used for our project and bundles them all together into one nice bundle.js file
for a web browser to use.
2. Check that you have webpack with `webpack -v`. You should get a screen full
of instructions rather than a "command not found" error.
3. Navigate down to to react directory. From the directory we were in a moment
ago, the command would be `cd react`.
4. Install all the react packages the project uses. The command is `npm
install`. This takes the contents of the package.json file and installs all the
packages in that file to your machine.
5. Check that the Node Package Manager can successfully run tests. The command
is `npm test`. This should launch Chrome if you have it installed and give you
a message that it properly ran tests.

##Recompiling
1. From the react directory where you should still be if you haven’t changed
it, re-pack all the files into a new bundle file with the command `webpack`.
You should get a message that says a file size and not a big red error message.
The settings for webpack are in the webpack.config.js file if you want to look
at them.
2. Fire up a web server. Run the command `node server.js`. It should tell you
the server is up on port 3000.
3. Look at the file. Leave the command prompt running and open a web browser
(Chrome is probably best since we’re going to be using Chrome features later)
and go to [http://localhost:3000/](http://localhost:3000/).
4. When you’re done playing, go back to the command prompt and Control+c will
stop the server from running.
