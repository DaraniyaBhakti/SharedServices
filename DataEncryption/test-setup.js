// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));

jest.mock("rn-fetch-blob", () => ({
  ios: {
    previewDocument: jest.fn(),
  },
}));

jest.mock("react-native-fs", () => ({
  downloadFile: jest.fn(() =>
    Promise.resolve({
      statusCode: 200,
      bytesWritten: 1024,
    }),
  ),
}));

jest.mock("react-native-document-picker", () => ({
  pickSingle: jest.fn(() => {
    return {
      uri: "file:///path/to/file",
      type: "text/plain",
      name: "file.txt",
      size: 1024,
      lastModified: Date.now(),
    };
  }),
  types: {
    plainText: "text/plain",
  },
}));
