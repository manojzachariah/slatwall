
/**
 * 
 * error TS2686: 'angular' refers to a UMD global, but the current file is a module. Consider adding an import instead.
 * 
 * Solution
 * 
 * https://stackoverflow.com/a/42035067
 * 
 */

declare global {
    const angular: ng.IAngularStatic;
  }
  export {};