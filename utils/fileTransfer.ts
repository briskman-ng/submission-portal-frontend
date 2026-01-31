// utils/fileTransfer.ts
class FileTransfer {
  private static instance: FileTransfer;
  private files: File[] = [];

  static getInstance() {
    if (!FileTransfer.instance) {
      FileTransfer.instance = new FileTransfer();
    }
    return FileTransfer.instance;
  }

  setFiles(files: File[]) {
    this.files = files;
  }

  getFiles() {
    return this.files;
  }

  clear() {
    this.files = [];
  }
}

export const fileTransfer = FileTransfer.getInstance();