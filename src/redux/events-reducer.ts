import { httpRequests } from "./../api/api";
import { EventsType, OrganizersType } from "../types/types";
import { InferActionsTypes, BaseThunkType } from "./store";

let initialState = {
  events: [] as Array<EventsType>,
  event: {} as EventsType,
  organizers: [] as Array<OrganizersType>,
  editStatus: false as boolean,
  timeZone: "Europe/Moscow" as string,
};

const eventsReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "SN/SET_EVENTS": {
      return { ...state, events: action.response };
    }
    case "SN/SET_ORGANIZERS": {
      return { ...state, organizers: action.response };
    }
    case "SN/EDIT_TOGGLE": {
      if (state.editStatus === false) {
        return { ...state, editStatus: true };
      } else if (state.editStatus === true) {
        return { ...state, editStatus: false };
      } else {
        return {
          ...state,
        };
      }
    }
    case "SN/SET_EVENT": {
      return { ...state, event: action.response };
    }
    case "SN/SET_TIMEZONE": {
      return { ...state, timeZone: action.timeZone };
    }
    default:
      return state;
  }
};

export const actions = {
  setEvents: (response: Array<EventsType>) =>
    ({ type: "SN/SET_EVENTS", response } as const),
  setOrganizers: (response: Array<OrganizersType>) =>
    ({ type: "SN/SET_ORGANIZERS", response } as const),
  editStatus: () => ({ type: "SN/EDIT_TOGGLE" } as const),
  setEvent: (response: EventsType) =>
  ({ type: "SN/SET_EVENT", response } as const),
  setTimeZone: (timeZone: string) =>
  ({ type: "SN/SET_TIMEZONE", timeZone } as const)
};

export const getEvents = (): ThunkType => async (dispatch) => {
  const response = await httpRequests.getEvents();
  console.log(response);
  dispatch(actions.setEvents(response));
};

export const getOrganizers = (): ThunkType => async (dispatch) => {
  const response = await httpRequests.getOrganizers();
  console.log(response);
  dispatch(actions.setOrganizers(response));
};
export const updateEvent = (event: any, id: string): ThunkType => async (dispatch) => {
  const response = await httpRequests.putEvent(event, id);
  console.log(response);getEvents();
};
export const getEvent = (id: string): ThunkType => async (dispatch) => {
  const response = await httpRequests.getEvent(id);
  dispatch(actions.setEvent(response));
};



type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

export default eventsReducer;
