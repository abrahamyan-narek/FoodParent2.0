import { alt } from './../alt';
import * as Alt from 'alt';
import { browserHistory } from 'react-router';
import { AbstractActions } from "./abstract.actions";

var Settings = require('./../constraints/settings.json');
import { NoteModel, INoteProps } from './../stores/note.store';
import { addLoading, removeLoading } from './../utils/loadingtracker';
import { noteSource } from './../sources/note.source';
import { displaySuccessMessage, displayErrorMessage } from './../utils/message';
import { localization } from './../constraints/localization';

interface INoteActions {
  createNote(person: NoteModel);
  createdNote(props: INoteProps);
  updateNote(person: NoteModel);
  updatedNote(props: INoteProps);
  resetTempNote();
  fetchNotesFromTreeIds(treeIds: Array<number>);
  fetchedNotes(notesProps: Array<INoteProps>);
  deleteNote(note: NoteModel);
  deletedNote(props: INoteProps);
  setCode(code: number);
}

class NoteActions extends AbstractActions implements INoteActions {
  updateNote(note: NoteModel) {
    let self: NoteActions = this;
    return (dispatch) => {
      addLoading();
      dispatch();
      self.setCode(92);
      noteSource.updateNote(note).then((response) => {
        displaySuccessMessage(localization(604));
        self.updatedNote(response);
        removeLoading();
      }).catch((code) => {
        displayErrorMessage(localization(code));
        self.setCode(code);
        removeLoading();
      });
    }
  }
  updatedNote(props: INoteProps) {
    return (dispatch) => {
      dispatch(props);
    }
  }
  createNote(note: NoteModel) {
    let self: NoteActions = this;
    return (dispatch) => {
      addLoading();
      dispatch();
      self.setCode(93);
      noteSource.createNote(note).then((response) => {
        displaySuccessMessage(localization(605));
        self.createdNote(response);
        removeLoading();
      }).catch((code) => {
        displayErrorMessage(localization(code));
        self.setCode(code);
        removeLoading();
      });
    }
  }
  createdNote(props: INoteProps) {
    return (dispatch) => {
      browserHistory.push({pathname: window.location.pathname, query: { note: props.id }});
      dispatch(props);
    }
  }
  resetTempNote() {
    return (dispatch) => {
      dispatch();
    }
  }
  fetchNotesFromTreeIds(treeIds: Array<number>) {
    let self: NoteActions = this;
    if (treeIds != null && treeIds.length > 0) {
      return (dispatch) => {
        addLoading();
        dispatch();
        self.setCode(90);
        noteSource.fetchNotesFromTreeIds(treeIds).then((response) => {
          self.fetchedNotes(response);
          removeLoading();
        }).catch((code) => {
          displayErrorMessage(localization(code));
          self.setCode(code);
          removeLoading();
        });
      }
    }
    return null;
  }
  fetchedNotes(notesProps: Array<INoteProps>) {
    let self: NoteActions = this;
    return (dispatch) => {
      dispatch(notesProps);
    }
  }
  deleteNote(note: NoteModel) {
    let self: NoteActions = this;
    return (dispatch) => {
      addLoading();
      dispatch();
      self.setCode(91);
      noteSource.deleteNote(note).then((response) => {
        displaySuccessMessage(localization(607));
        self.deletedNote(note.toJSON());
        removeLoading();
      }).catch((code) => {
        displayErrorMessage(localization(code));
        self.setCode(code);
        removeLoading();
      });
    }
  }
  deletedNote(props: INoteProps) {
    let self: NoteActions = this;
    return (dispatch) => {
      browserHistory.replace({pathname: window.location.pathname});
      dispatch(props);
    }
  }
  setCode(code: number) {
    let self: NoteActions = this;
    return (dispatch) => {
      dispatch(code);
    }
  }
}

export const noteActions = alt.createActions<INoteActions>(NoteActions);
