The purpose of this app is to make it convenient to watch YouTube videos based on your itunes library. One must export an xml file from itunes by File->Library->Exmport library. Once loaded one can double clisk on a song and a coverflow will appear that displays the most viewed videos matching that song and artist. Results will be displayed in descending order based on view count. Click outside of the youtube div to remove to current swf element. Navigation can then continue through the coverflow. Click on any song again to requery google. 

Required Elements [35 pts; 5 pts each]
Your project must demonstrate clear and effective use of each of the following major concepts we have covered:

Javascript (including creating your own objects with inheritance)
-- used javascript for creating converflow effect
--used javascript for uploading file, redirection, parsing and creating library, displaying library, creating playlists, dynamic display, etc. 

Canvas (somehow this must be included meaningfully)
--start screen for app

HTML (including a reasonably wide range of techniques, such as tables, forms with form validation, etc)
--xml file is validated as being an actual xml file
--use tables to list songs. Use classes and selectors for manipulation

CSS (including a reasonably range of techniques, such as reset, pseudo-selectors, fixed and fluid layout, transitions and animations, etc)
--coverflow display function
--extensive use of css for both layout and jquery selection.
--used 

DOM manipulation
--coverflow display function
--Creating and adding songs to the library. Parsing the xml file. Playlist management.

AJAX and/or JSON-P client
--retrieving information from google
--We also asynchronously upload and parse files, create and add playlists, play songs, query youtube.
--Store song library as a JSON string for HTML5 localStorage.

jQuery
--used extensively throughout for dom manipulation, effects, etc.
 
Robust App [20 pts]
Your web app should work.  It should load and run with no exceptions, and clearly perform some easily-understood task, and it should perform it properly under normal usage.  It also should not crash or hang or otherwise enter some error state, even in the face of undesired input.
-- Coverflow works best in Web-kit browsers and relatively well in mozilla
- adds data from local storage
--verifies file is of type text/XML
  
User Interface Design [20 pts]
You should have a reasonably polished user interface with a clean, pleasing visual design, and with intuitive controls and navigation.
-simple, minimalistic design
-coverflow fun to use
  
Effort [20 pts]
Once again:  you are expected to invest at least 10-15 hours into this project, and it is further expected that your project will clearly reflect the quantity and quality of design and craftsmanship that goes along with that much time on this task.
-- 50+ hours between the two of us. Overusage of MDN, jQuery's API, and google.
 
Code Design / Style [5 pts]
Your project should be divided properly into HTML, CSS, and JS, with clear designs in each.  Your code should abide by all the style guidelines we have discussed in this course.
-- code separated based on style guidelines
   
Bonus [0 to 10+ pts]
For extraordinary work, we may award bonus points.   Please discuss more ambitious bonus attempts with the TA's or the instructor prior to investing too much time into them!