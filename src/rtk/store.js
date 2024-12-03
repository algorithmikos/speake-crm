import { configureStore } from "@reduxjs/toolkit";
import parentsSlice from "./slices/parents-slice";
import sessionsSlice from "./slices/sessions-slice";
import UISlice from "./slices/ui-slice";
import generalsSlice from "./slices/generals-slice";
import assignmentsSlice from "./slices/assignments-slice";

import clientsSlice from "./slices/clients-slice";
import studentsSlice from "./slices/students-slice";
import classesSlice from "./slices/classes-slice";
import campaignsSlice from "./slices/campaigns-slice";
import filtersSlice from "./slices/filters-slice";
import utilsSlice from "./slices/utils-slice";
import usersSlice from "./slices/users-slice";

export const store = configureStore({
  reducer: {
    users: usersSlice,
    clients: clientsSlice,
    students: studentsSlice,
    classes: classesSlice,
    campaigns: campaignsSlice,
    utils: utilsSlice,
    filters: filtersSlice,

    parents: parentsSlice,
    sessions: sessionsSlice,
    assignments: assignmentsSlice,
    UI: UISlice,
    generals: generalsSlice,
  },
});
