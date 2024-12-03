export const versionChangeLog = [
  {
    version: "3.4.6",
    date: new Date("2024-08-22T10:06:00"),
    bugs: [
      `Resolved minor bugs on the students' page and other areas in preparation for the handover of project materials.`,
    ],
  },
  {
    version: "3.4.5",
    date: new Date("2024-07-29T22:17:00"),
    bugs: [
      `App no longer crashes when refreshing some pages such as: "Dashboard" and "Settings".`,
    ],
  },
  {
    version: "3.4.4",
    date: new Date("2024-07-28T12:15:00"),
    enhancements: [
      `Updates to database have been improved and accelerated.`,
      `Updates to database are adjusted to match the updated document model and respect the data integrity of the database.`,
      `The database has been secured and CRUD permissions of authenticated users/agents have been set according to user groups.`,
      `The app loads slightly faster when opened for the first time thanks to storing "sign-in" and "app loading" statuses in user device/browser local storage without having to wait for the server to check if the user is still logged in.`,
      `The class in which a student is enrolled or a client has chosen is displayed in an enhanced form in all views providing clearer information about the class.`,
    ],
    bugs: [
      `Solved a bug where a purchased session of a student was still present as a purchaseable session in "Sell Coupon" form leading to the possibility of selling the same session again to the same student.`,
    ],
  },
  {
    version: "3.3.3",
    date: new Date("2024-07-25T14:50:00"),
    new: [`Added "Sessions" section.`],
    bugs: [
      `Solved a bug where excluding archive and re-including it was causing the archived data to be duplicated exponentially every time.`,
    ],
  },
  {
    version: "3.2.2",
    date: new Date("2024-07-22T15:45:00"),
    new: [
      `Filters can now be used in CRM table view.`,
      `Created "Students" section and table view which only get displayed on web/desktop platforms.`,
      `Enabled Convert clients into students action.`,
      `On mobile, the app bar will now disappear on scrolling leaving more space for reading page content.`,
    ],
    enhancements: [
      `Re-designed loading page.`,
      `Enhanced app bar on all platforms.`,
      `Re-designed "CRM" toolbar.`,
      `Reworked "Marketing" section table.`,
      `Moved filters to an external dialog to better utilise the displayed page space.`,
    ],
  },
  {
    version: "3.1.2",
    date: new Date("2024-07-19T17:24:00"),
    new: [
      `In Mobile CRM, added the clients total number, if filter applied, the number represents the number of results matching the filter`,
    ],
    enhancements: [
      `Enhanced the CRM table, hid phone number, area and chosen class columns by default. If needed they can be displayed again controlling the visible columns by clicking on any column menu and then "Manage Columns"`,
    ],
    bugs: [
      `fixed a bug where "Include Archive?" checkbox was not maintaining its state if agent moved from one page to another.`,
    ],
  },
  {
    version: "3.0.1",
    date: new Date("2024-07-19T01:38:00"),
    bugs: [
      `Quick fix to a fatal error on the "Reply Texts" page that exhausted database server resources because a user's login state was bound to an object containing replies.`,
    ],
  },
  {
    version: "3.0.0",
    date: new Date("2024-07-18T16:56:00"),
    new: [
      `Authentication has been added to the app and is no longer readable by anyone passing by on the Internet.`,
      `Added "Settings" section where agent can adjust their preferences in using the application or even logs out to end their session.`,
    ],
    enhancements: [
      `App menu is now hidden on mobile until requested by pressing on menu hamburger button, providing more space in the app screen and not imitating Telegram (The messaging app) at all.`,
      `Removed sections under maintenance as they are no longer needed for this version.`,
    ],
  },
  {
    version: "2.4.4",
    new: [
      `A new filtering option allows agents to find leads based on the date of their last call, with the ability to specify a date range.`,
    ],
    enhancements: [
      `A field in CRM Mobile lead/client card from now on is only displayed if it contains a value.`,
      `Enhanced CRM Mobile Filters and its design.`,
      `Restructured "Replies" section.`,
    ],
    bugs: [
      `All "Save" buttons now reflects the state of the process by loading indicator. In earlier versions, agent was confused whether the app is frozen or their internet connection is weak while in fact the app was still trying to connect to the server to save data. Out of the confusion, an agent repeatedly presses the button, unknowingly triggering more than one request to the server to update the data, which caused some direct or indirect issues.`,
    ],
  },
  {
    version: "2.3.3",
    enhancements: [
      `"Next Action" field is now part of the client itself not the call made to them.`,
    ],
  },
  {
    version: "2.2.3",
    bugs: [
      `A Quick fix to remove finished advertising campaigns from being selectable in "Lead Source" field of new/edit client form.`,
    ],
  },
  {
    version: "2.2.2",
    new: [
      `Agent can now display archived leads by including them into the CRM and/or Dashboard using "Include Archive" button.`,
    ],
    enhancements: [
      `Restructured Dashboard/Home cards to display important statistics a little better.`,
      `Converted the "More Products" button in "Request" field of new/edit client form, which was an item in the select menu, to a checkbox outside the menu for a more convenient UX.`,
      `Enhanced CRM Mobile Filter. It was also prepared to be added to the wide-screen platform i.e. table view in the next version, God willing.`,
      `Enhanced CRM card pagination.`,
    ],
    bugs: [
      `Sloved a bug in new/edit client forms where the secondary products i.e. market demand options featured in v.2.0.0 couldn't have been chosen.`,
    ],
  },
  {
    version: "2.1.1",
    new: [
      `Added "Next Action" to call card details with options: ["Call Again", "Message on WhatsApp", "Details on WhatsApp", "Convert to student", "Archive"].`,
      `Added "Reminder" to call card details.`,
    ],
    bugs: [
      `Solved a bug in client call dialog where adding the very first call without editing it would prevent closing the dialog without saving.`,
    ],
  },
  {
    version: "2.0.0",
    new: [
      `Started logging app version changes.`,
      `Added "Facebook", "Instagram" and "WhatsApp" options to lead source select menu tagged with "(General)" to refer to those who came without advertising campaigns directly.`,
      `Added "Acquaintances" as an option of lead source select menu as the need for that arose.`,
      `Added "Request" field to the client with "English Course" option and options for school educational levels in order to better track market needs as people started to frequently ask about things other than 3rd secondary school lessons. Only "3rd Sec" & "English Course" options are displayed by default, the rest of the options need to be expaned using "More Options" button.`,
    ],
    enhancements: [
      `The "Source" column in CRM table of wide-screen view i.e. on computer, laptop or tablet is now displaying the text of the lead source like mobile cards because expression only with icons is no longer sufficient since the start of ad campaign tracking.`,
    ],
    bugs: [
      `Solved a bug in CRM on mobile where the updates in database made by another agent were returning the user agent to the first page of cards if they are on another page.`,
    ],
  },
];
