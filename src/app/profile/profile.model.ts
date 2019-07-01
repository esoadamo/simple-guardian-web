export class Profile {
  name: string;
  id: number;
  author: number;
  description: string;
  config: {
    logFile: string;
    filters: string[];
  };
}
