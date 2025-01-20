import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { DocumentItem } from '../core/models/doc.model';
import { Message, User } from '../core/models';

export const DocumentActions = createActionGroup({
  source: 'Document',
  events: {
    'Load Documents': emptyProps(),
    'Load Documents Success': props<{ documents: DocumentItem[] }>(),
    'Load Documents Failure': props<{ error: Error }>(),
    'Create Document': props<{ document: DocumentItem }>(),
    'Create Document Success': props<{ document: DocumentItem }>(),
    'Create Document Failure': props<{ error: Error }>(),
    'Update Document': props<{ document: DocumentItem }>(),
    'Update Document Success': props<{ document: DocumentItem }>(),
    'Update Document Failure': props<{ error: Error }>(),
    'Delete Document': props<{ documentId: number }>(),
    'Delete Document Success': props<{ documentId: number }>(),
    'Delete Document Failure': props<{ error: Error }>(),
  }
});

export const UserActions = createActionGroup({
  source: 'User',
  events: {
    'Update User Role': props<{ userId: number; role: string }>(),
    'Update User Role Success': props<{ user: User }>(),
    'Update User Role Failure': props<{ error: Error }>(),
  }
});

export const ChatActions = createActionGroup({
  source: 'Chat',
  events: {
    'Send Message': props<{ message: Message }>(),
    'Send Message Success': props<{ message: Message }>(),
    'Send Message Failure': props<{ error: Error }>(),
    'Load Messages': emptyProps(),
    'Load Messages Success': props<{ messages: Message[] }>(),
    'Load Messages Failure': props<{ error: Error }>(),
  }
});
