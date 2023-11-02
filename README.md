# ChapterCache Client

This is the client application for the [CS 262 ChapterCache project.](https://github.com/calvin-cs262-fall2023-teamG/Project)


# **(10/6)**
- This prototype allow a user to Login to our app either by using 'admin'- 'admin' credentials.

- They can create their own username and password using our 'Create an Account' button. It stores the values in React Native's async storage which allows you to use the login credentials that was just created.
- There is a '+' button where the user can add information about their book along with pictures of front and back of the book.

# **(10/19)**
*UI improvements*
- This prototype contains no functionality changes but does update the UI/Styles
- UI updates include more consistent color scheme, improved spacing and other tweaks

# **(10/23)**
*UI fixes & 1 new minor feature*
- 'Contact info' screen now auto-populates with the users info
- Fixed search bar size
- Updated 'Sell a book' button width to match the rest of the interface and centered correctly in the footer
- Fixed slight horizontal scroll that would occur on home page
- Fixed icons and width of contact info fields
- Eliminated blank space in book info screen
- Other minor UI tweaks
### **Known issues**
- Search function causes book items with short titles to shrink in width

NOTES:

How to use <Button>?
- style: it can either be a 'button' or 'text'. It depends on where you button has a background in the back or not
- label: the text that goes in the button
- onPress: The result to the buttonpress action
How to use <InputBox>?

# **(11/1)**
- Added help page to the 'Add Book' page
- Added background component for reusability
# **(11/2)**
### Help page updates
- Added help page to the 'Book Info' page
- Fixed help page text formatting
### UI Updates
- Removed scroll bar from 'Main' page
- Fixed border radius of book objects
- Installed 'react native reanimated'
- Added entrance animations to 'Main' page
- Added entrance animations to 'Add Book' page
- Added entrance animations to 'Contact Info' page
- Added entrance animations to 'Add Book Help' page
- Added entrance animations to 'Book Info Help' page
- Book info now fills full screen
### **Known issues**
- Full name field not being currectly retrived from backend
- Modals in profile view could use some extra space above keyboard