export class MyWorklistColumnSettingsModel {
  configureName = '';
  settings: {
    fieldName: string;
    isShown: boolean;
  }[] = [];
}

export class MyWorklistColumnSettingsSubSettingsModel {
  fieldName = '';
  isShown = true;
}
