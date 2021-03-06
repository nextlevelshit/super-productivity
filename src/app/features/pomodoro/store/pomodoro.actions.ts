import { Action } from '@ngrx/store';

export enum PomodoroActionTypes {
  StartPomodoro = '[Pomodoro] Start Pomodoro',
  PausePomodoro = '[Pomodoro] Pause Pomodoro',
  StopPomodoro = '[Pomodoro] Stop Pomodoro',
  FinishPomodoroSession = '[Pomodoro] Finish Pomodoro Session',
}

export class StartPomodoro implements Action {
  readonly type = PomodoroActionTypes.StartPomodoro;
}

export class PausePomodoro implements Action {
  readonly type = PomodoroActionTypes.PausePomodoro;
}

export class StopPomodoro implements Action {
  readonly type = PomodoroActionTypes.StopPomodoro;
}

export class FinishPomodoroSession implements Action {
  readonly type = PomodoroActionTypes.FinishPomodoroSession;

  constructor(public payload: { isDontResume: boolean; }) {
  }
}

export type PomodoroActions
  = StartPomodoro
  | PausePomodoro
  | StopPomodoro
  | FinishPomodoroSession;
