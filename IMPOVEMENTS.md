# SUGGESTED IMPROVEMENTS
## IMPOVEMENTS TO EXISTING FEATURES
### Backgrounds, Highlighting and Visual Effects
- Alternate coloring of successive rows of emails in the search result listing to improve resolution within the chosen general color scheme
- The rows with a backgound color should have the current highlighting color for the background
- Higlighting the current row in the web view should be by a lighter text color on a darker shed of gray as background. This way, the use of color would be minimized and visual stress and excitment reduced
- The same highligting scheme should be maintained accross interfaces that need highlighting
- The mail list-head fields in the search result should follow a similar highlighting scheme for intuitive user recogition of them as interactive elements
- Interactive components should have visual effects for interaction feedback
- A light gray background with a deeper shed of the same for box shadow is recommended fo creating a sinking effect on click
### Fonts
- The font sizes should be reduced in the email listing and a more spaced font type used for listing email fields in the search results page
- The font size for the mobile view should particularly be reduced
## ADDITIONAL FEATUES AND THEI IMPLEMENTATION
### User Login and Manageement Interface
The application is meant for restricted/admin goup access. It would therefore necessitate an authentication and  user credentials managemet interface. The succeeding is a list of the pertinent suggestions:
- A login interface on the landing/home page
- A user icon for opening the user management portal on subsequent pages
- This Icon does not need to have a picture or be elaborately colored
- The mobile view will have the same interface accross all 

	***Design and specs***
- The login option should be by the company email povider, say Google login, if the company uses Google for email services for example, or an authentication provider like Okta
- The container for the login icon should be made light gray to blend into the general theme
- The login container should have a background the color of the horizontal line at th page top, a font size of 1rem and the same font color as the logo displayed
- An authorized login logo of the authentication provider that best matches the general page theme should be chosen if a range is available
- On the web view, the login icon should be made large and conspicuous
- The mobile view should have a small user icon for login and user management accross all pages
- The icon on the web view should be of about the same size as the calendar icon in the search bar

	***Location***
- The landing page login interface should be on the top right corner of the body, just below the horizontal line in the web view. This will honne the users familiarity from expeience
- The mobile view login interface should be adjacent with the search bar
- On the web view, the inner pages' user icon should be located on the top right corner
### User Infomation and Tips
- Tool-tips and information bubbles should be used to tip the user on interactive interfaces that can not be made prominent enough or are not easily recogisable. Examples are options like opening multiple mails between the same correspondents, changing the sorting field or order, the search field or order, etc
- These information containers should not compete for attention with the main content, yet be cospicuous enough to pass on the needed information
- They should hence be displayed in sections of the page not overlaping with the main content view, page top third, where possible or for the web view, right where the interface is, like the tally of multiple mails
- To prevent an infodemic and conjestion of the page with user info, these info pieces should only show up on hover or initial page load, depending on then case in question
- The info bubbles should only show for a short time
- The bubbles and tips should have a consistent styling following the generl color theme but be made to stand out, preferably like the [highlighting](#Backgounds-and-Highlighting-and-Visual-Effects) color scheme mentioned earlier
### Pagination
- Search results, especially if many, that can not fit in the view height should be displayed in chunks. Hence a set of pagination controls like the start, back, current page number, next page and last page should be built at the foot of the list display on the search results page for both the mobile and web views
### Selection Filing
Similar to bookmaking, the user could be given an option of grouping found emails in folders for different forensic casses for future use. This would reduce the need to keep searching for the same emails over and over
### Specific Email Actions
- In the email body inspection page, intefaces shoud be provided for actions on the specific email like deleting, forwarding to forensics group or pinting

	***Design and specs***
- These will be buttons in the web view and could be the same, or icons in the mobile view
- In the case of buttons, they should have the same styles and visual effects on hover and click as highlighted in the section on [backgrounds](#Backgounds-and-Highlighting-and-Visual-Effects), highlightig and visual effects above
- The delete action in addition to the the efffects should tigger a confirmation dialogue and on complettion generate a success message
- A provision should also be made for highlighting sections of a given email

	***Location***
- In both the mobile and web views, these action interfaces will take the place of the search actin controls in the table head of the preceeding search result page
- A possibility of including them in the page menu on the mobile view can as well be explored
### Pogress Indication
In the event that emails are loaded fom a remote sever, latency is inevitable. An indication of the progress of requests is therefore necessary

	***Design and specs***
- A spinner or pogress bar would do for this purpose
- In light of the general color scheme of the site, a spiner is peferred
- The spinner should be a band of a deeper shade of gray on white

	***Location***
- In the mobile view, the spinner should be positioned in the middle of the page
- The web view should have the spinner right on the element that invoked the action
### Page Menu
These new features need a page action menu possibly inluding options for:
- Muting user tips and information bubbles
- 'Bookmarking' emails for future use
- Highlighting sections of an email
- Changina pagination setting

	***Design and specs***
- In the web view, the menu could be a collapsable column running from page top to bottom at, say, 15% of the page width
- The menu should only be available in the inner pages
- It shuld follow the same [backgound](#Backgounds-and-Highlighting-and-Visual-Effects) and color shemes as the rest of the page
- Menu item fonts should be lighter and smaller, say 80% of the main page fonts
- Items should be listed as rows and have the same [visual](#Backgounds-and-Highlighting-and-Visual-Effects) effects as the general scheme
- The mobile view should integrate these extra menu items into the hambugger menu icon interface already disussed in the [user management section](User-Lgin-and-Management-Interface) above

	***Location***
- The right side of the page is preffered for the webview as the user menu is already located atop and all manipulations can be localized for ease of access other than having to dift across the page
- Additionally, with the menu on the extreme right, the user may not find it necesssary to be collapsed, the more crucial fields of sender, receive and subject will still be visible