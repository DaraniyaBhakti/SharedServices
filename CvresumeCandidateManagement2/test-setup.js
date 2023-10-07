// test-setup.js
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mockResponseUpdate } from "./src/mock.ts";

configure({ adapter: new Adapter() });

jest.mock("react-native/Libraries/Utilities/Platform", () => ({
  OS: "macos",
  select: () => null,
}));

jest.mock("react-native/Libraries/Utilities/Dimensions", () => {
  const dimension = jest.requireActual(
    "react-native/Libraries/Utilities/Dimensions",
  );
  return {
    ...dimension,
    addEventListener: jest.fn().mockImplementation((event, cb) => {
      return cb({});
    }),
    get: jest.fn().mockReturnValue({ width: 100, height: 100 }),
  };
});

global.console.warn = jest.fn();

const mockdata = mockResponseUpdate.success;
jest.mock("../../framework/src/StorageProvider", () => ({
  get: jest
    .fn()
    .mockImplementationOnce(() => null)
    .mockImplementationOnce(() => null)
    .mockImplementation((key) => {
      if (key === "token") {
        return mockdata.meta.token;
      }
      if (key === "user") {
        return mockdata.meta.id;
      }
      return null;
    }),
  set: jest.fn(),
}));
