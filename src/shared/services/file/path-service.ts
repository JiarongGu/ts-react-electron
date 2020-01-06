import * as electron from 'electron';
import * as path from 'path';

import { EnvironmentService } from '../environment/environment-service';

export class PathService {
  private _environmentService: EnvironmentService;

  constructor() {
    this._environmentService = new EnvironmentService();
  }

  public get resourcesPath() {
    if (this._environmentService.isDevelopment) {
      return process.env.APP_RESOURCES as string;
    }
    return electron.remote.process.resourcesPath;
  }

  public get assetPath() {
    return path.join(this.resourcesPath, 'asset');
  }

  public get dataPath() {
    return path.join(this.resourcesPath, 'data');
  }

  public get appPath() {
    return electron.remote.app.getAppPath();
  }
}
