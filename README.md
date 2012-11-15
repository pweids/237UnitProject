<emp>This is our Unit Project for 237. Notes and implementation strategy are here.</emp>
<emp>For usage, you will have to upload an XML file from your iTunes library. A sample XML file is provided as Library.xml</emp>

<h1>Application Logic</h1>

<h2>Import Playlist from iTunes</h2>
<ul>
    <li>Prompt user for XML file</li>
    <ul>
        <li>Parse XML for Artist, Albums, Songs, Time</li>
        <li>Populate the Library Window</li>
    </ul>
</ul>

<h2>Library Window</h2>
<ul>
    <h3>Click on a song</h3>
    <ul>
        <li>Highlight it</li>
        <li>Query YT for vid list</li>
        <ul>
            <li>Raise up iFrame</li>
            <li>Draw videos</li>
            <h3>Click next/prev button</h3>
            <ul>
                <li>Move thumbnails</li>
                <li>Play new vid</li>
            </ul>
        </ul>
    </ul>
    <h3>Click Play</h3>
    <ul>
        <li>toggle play of YT video (or begin playing 1st song in current window)</li>
    </ul>
    <h3>Click next</h3>
    <ul>
        <li>redraw iFrame</li>
    </ul>
    <h3>Click PL name</h3>
    <ul>
        <li>Highlight PL</li>
        <li>remove all song DOM elements in current library</li>
        <li>refill with dom elements form appropriate playlist</li>
    </ul>
</ul>

<h2>Milestones</h2>
<ol>
    <li>Get static UI</li>
    <li>Add dynamic elements to UI</li>
    <li>Write XML parser for playlist and store in proper object</li>
    <li>Fill library functionality</li>
    <li>Create and add Playlist functionality</li>
    <li>Sorting of library elements</li>
    <li>Write Youtube player/iFrame</li>
    <li>Write Controller from Library</li>
</ol>

<h1>Data Structures</h1>
<pre>
    playlist{
        "Name":Str,
        "Songs":[]
    }
</pre>

<pre>
    song {
        "Artist": str,
        "Title" : str,
        "Album" : str,
        "Time" : num,
        "defaultVidIndex" : num
    }
</pre>

<pre>
    queue {
        "songs" : array,
        "shuffle" : boolean,
        "repeat" : <"no", "all", "one">
    }
</pre>

<h2>Work Division</h2>
<h3>Paul</h3>
<ul>
    <li>HTML and CSS</li>
    <li>Library parsing, storage, and display</li>
    <li>Ajax functionality</li>

</ul>
<h3>Jeff</h3>
<ul>
    <li>YouTube API</li>
</ul>