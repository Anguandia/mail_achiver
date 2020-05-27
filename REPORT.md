# REALIZATION OF MAIL ACHIVER MOCKUP
## Introduction
This write-up documents the design implementatin process, thought process, technologies used, some technical work-arounds, challenges faced during the mockup impemenation and user experience considerations

## Technologies Used
- Vanilla JavaScipt
- HTML
- CSS

## Implementation Process
- Idenification/classsification of UI components as static and dynamic
- Preliminary box-sizing and components layout with HTML and CSS
- Adaptation of layout for responsiveness
- Detail indentification: font sizes, weights, colors, families, line-heights etc, relative sizing of different components, background colors, cursor, etc
- Identification of CSS property combinations to achieve fidelity to design
- Conceptualization of site features/functionality
- Translation of functionality into the dynmic components of the pages

## Activity Planning and Options Considered
- The instinctive plan was to tabulate all email data, use a dynamic mock email data set and build out the individual email body inspection page. This however would result in code redundancy, since the body can be built into the search result listing.
- The modified plan then sought to use ordinay divs for reponsiveness and only change display propeties of emails to display details from components already built during the search stage
- The browser's local storage was the first idea for state management, but this was later changed to the Window State Object to harness the advantage of the familiarity the browser's back and forward buttons have with users
- A hybrid static-dynamic mock demo email dataset was adopted over a dynamic one in the interest of time, though the dynamically generated dataset would get the testing closer to real-life usage

## Process Description
- Typically, every stage from page layout to filling the pages with individual elements, styling the elements and adjusting for fidelity was executed in small iterations where the results thus far were viewed on adjacent split-sceens; one half showing the in-process mockup against the design in the other half. It was important to haave both half screens have the same heigt and width to compare the two
- This build-compare-adjust cycle was repeated per element/component and accomodation made for responsiveness across device sizes in each case
- Under the pevailing conditions of social-distancing however, no eviews/criticisms wee sought from any other. 

## Standards and Best Pactices
These pertain to both the UI and code, the former is detailed in the section on UX considerations.
These basics of clean code pactice were roughly followed
- Functions have been as extricated and decoupled from callers as possible to allow reuse, ease maintenance and scalling and get a more intuitive code
- Function and variable naming has been made as robustly descriptive as to make the code self documenting and intuitive from reading the function names. Ambiguous names have been at best avoided
- Naming conventions for funcions, variables and files
- Basic syntax and linting best practice like maximum line length, operator spacing, etc were observed as best, with no linters used
- There was utmost deliberate effort to minimize code redundancy and improve reusability. Hence complex operations were boken into a number of small, pupose-specific and highly reusable functions
- Frequently required sevices were build into generic functiors like createElt, capable of creating any HTML element with a variable number of attributes and properties
- A judicious decision was made at each stage where options existed for CSS and JavaScipt implementation of some styles

## Features
**Required features**
- The Sort/Searc feature is fully functional
- Defaults are set according to the design document; large sceens default to descendin email srting by date and all dates for the serch value
- Icons have been impovised for, and seach criterial extended to include searching by receiver email and subject
- The mobile view defaults to emails sorted by sender and no search value.
- The search field is made changeable by iterative clicking on the seachby icon. This changes both the icon and the placeholder in the search text field
- Sorting has also been extended to include sorting by receiver and subject.
- Sorting order has been made versible by clicking on the same head
- only the soting arrow fo the current sort-by field is displayed at any given time
- The current sorting order is indicated by the associated arow icon direction

**Additionl features**
In the body detail inspection page, these featues have been implemented:
- Email printing, incase the foensics teeam/stakeholders need to make/share hard copies of some emails
- Email fowarding for electonic sharing
- A delete email feature

## Data Management
- All dummy data is from a single point of truth, though partially dynmically generated
- Funtions intending to mutate input data make a copy to work on, preserving the integrity of the data
- Session data stoage is realised through the window state object and the data built into the pages
- Real data can well be plugged in and the demo will wok just fine

## History Management
- Application history state is managed through the Window State Object
- The state is updated with only dynamically built components of the UI on every event that mutates the UI
- Interaction handlers are reassigned to history pages on retrieval to make them interactive

## User Expeeience Considerations
- Non-destructing tool-tips and user infomation bubbles have been added to guide the user on the usage of some not-so-obvious features
- The tool-tips and user info bubbles are so hamonized with the pages' general theme as not to overshadow the main purpose, yet have a property or visual effect to grab just the optimal amount of attention from the user
- The tips and info are made momentary and do not intrude into reading space
- The general theme has been made consistent accross pages to avert visual and accomodation fatigue, and for pages not specified in the design, like the body inspection page, the use of color has been minimized to give prioity to content
- The range and extent of effects have been kept to a bare minimum to avoid user attention diversion
- Font sizes, colors and weights not specified in the design have been optimized to reduce visual fatigue, considering this is a reading platform

## Thought Pattern and Workflow Planning
- On initial search, dynamically build all HTML elements of each email queried, defaulting all emails
- Hide elements like the email body, not shown on the search result list by CSS
- Provide general styling by CSS
- Assign dynamic element styles that change on user interaction by JavaScript
- Define identifiers and styles for different subsequent displays resulting fom the search page results
- Hide unwanted components and show the required by JavaScript upon user inteaction, like inspecting the body(S) of a given email/email-group should hide the other emails, unhide the bodies of the target emails and change element identifier attributes of Class and/or Id to match predifined CSS categories and styles
- Build a dynmic dummy email data set so different time displays can match any time of testing and email bodies can be tailored to dummy user, subject and date vaiables for each email
- For the case of multiple emails between a given pair of correspondents, provide the options of individually listing, sorting and seaarching the emails in addition to showing all their details at once or individually
- Build a demonstrable use case of every element on the UI to simulate a real-life product

## Challenges, Work-arounds and Learnings From the Challenges
**Technical Challenges**
- As stated in the options considered, the initial instinct, basing on the wide screen design, was to use HTML tables to realize the search result page mockup. This was built and fast, however, responsiveness was complex and subsequent pages like the body inspection page, etc would have to be rebuilt.
This problem was however put to an advantage by converting the table into ordinary divs while maintaning table children element names for the corresponding div classes. This gave a structued and consistent CSS identifier naming scheme across the entire code base
- The resultant, inherently single page application had no navigation through history as the browsers back and forward buttons could not be used. This would either call for additional components, not specified in the design for existing pages subsequent from the default, lest one-way navigation, or a confrontation with the Window State Object. The former was no option for a high fidelity mockup, so Window State Object workings were explored in depth and used.
- A great deal of difficulty was faced with implementing the feature of optionally opening all multiple emails between the same correspondents, and first listing, then subsequently opening each in the collection individually.
The idea to assign the event handler for individually listing emails in a collection to the container element(row) and opening all bodies to the icon indicting the number of emails in the group dismally failed, the inner event always bubbling and triggering the outer handler before its own.
The work-aound was to attach the list-all handler to individual elements in the case email excluding the element for attaching the inspect-all-bodies handler. This woked wonders
- The date display on the mobile view fell out of alignment because of the varied lengths of the right aligned dates in the search result page of the design. The work around was to allign align dates with a dynamic margin, calculated from the length of the date displayed by JavaScript while overriding this margin by CSS for large screens, where the dates are left aligned and hence date lengths imaterial
- In history only the page state would be pushed with the inline event handlers. Hence once navigation through histoy was invoked, the dynamically attached event handlers were lost. This positively prompted further digging into the popstate event. An initial ceation of this outside the state definition captuered the event by default and histoy never loaded! The work-around was to use a single Window popstate handlerr and add all event handlers so as to be reattached when history pages load
**Others**
- Due to difficulties in internet access, most of the mockup was built off-line, hence continuous integation and version control pactices could not be adhered to
- Some more context on some sections of the challenge would have been desirable, like te liberty to use extra icons, the expected nature of this writeup, use of visual effects for user interaction feeddback, etc

## Selected Technical Implementation Details
**Searching**
- Searching is implemented in-place and in realtime. Emails whose search field property value do not match the search value keep disappearing from the list as the user keys in the search value, if an initial search had been done
- in the event of a virgin search, the search value is entered and the search tiggerred by click of the search button
- Technically, the search result is progressive anullment of the display propety of rows for which the email's search field value does not match the search value entered
- To track the search key and synchronize the search-by icon displayed, a search counter is set.
- The search counter represente the indices of search fields in the listing(table) head element and is used to set the search key in the search function
- The counter is initialized to the default search citeria basing on the screen size to display the correct search-by icon and give the right key upon initial page load
- The counter is cyclic such that each click advances the search-by icon and search key in the oder in which they appear in the UI/DOM tree
- The counter incrementation is modified to skip the attachments and mail tally head fields; no search is implemented by these keys
- The place holder text in the search input field is correspondingly changed when the seach-by criteria is changed
- Apart from date, searching is case insensitive
- Searching by date employs a compare function that filters out emails whose date as a timestamp falls within the search date range, also as a timestamp

**Sortinng**
- Sorting by date uses a number compare function that evaluates the relative order of emails
- String fields use case-insensitive string sorting for the specified key
- To keep track of the current sort-by field and associated sortig order, and array of 6, ascSort(for ascending sort), each elemennt corresonding to the from, to, tally, attachments and date email filed was created
- Each element of the ascSort array is a boolen keeping the last sorting order by the email field in the corresponding array index
- A click on each sort-by field toggles the coresponding value in ascSort and the sorting order by the corresponding email field
- The sorting arrow icon direction is then set by the boolean value of the coresponding ascSort array element. Techniclly, this boolean sets the arrow's transform poperty to rotate to 180 o 0, depending n the boolean value
- The sorting order array, ascSort, is initialized to have the elemment corresponding to either the sender or date field to truthy according to the design corresponding default sorting citeria of the present screen width

## Summary
  Attention has been paid to fidelity and mock functionality implemention for every element of the user interface. User guides have also been provided through tool-tips and info bubbles where necessary and visual effects added to user interactions and important user information. The reader is highly encouraged to try out every single feature presented in the UI and have a feel of a real application