export interface Image {
  id: string;
  title: string;
  alt: string;
  filename:string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  sizes: {
    [key:string]: {
      width: number;
      height: number;
      mimeType: string;
      filesize: number;
      filename: string;
      url:string;
    }
  }
  createdAt: string;
  updatedAt: string;
  url: string;
}
