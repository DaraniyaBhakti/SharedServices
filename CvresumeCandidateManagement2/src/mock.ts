import { ButtonProps } from "./Types";

export const mockData = {
  id: "12",
  type: "entry",
  attributes: {
    name: "test 123",
    age: 8,
    years_of_experience: 8,
    experience_summary: "experienced",
    education_summary: "test 123r",
    created_by: "37",
    updated_by: "37",
    created_at: "2023-03-08T07:39:51.203Z",
    updated_at: "2023-03-08T07:42:12.693Z",
    experience_file:
      "https://minio.b294805.dev.eastus.az.svc.builder.cafe/sbucket/oewc5z2st03dy5g465lsb5vmxeyy?response-content-disposition=inline%3B%20filename%3D%22sample%20%25281%2529%20%25282%2529.pdf%22%3B%20filename%2A%3DUTF-8%27%27sample%2520%25281%2529%2520%25282%2529.pdf&response-content-type=application%2Fpdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230308%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230308T074255Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=0492120a86ac51b9e15676b456c571d453d77600e87b18b8975b31e7b1c25a7a",
    education_file:
      "https://minio.b294805.dev.eastus.az.svc.builder.cafe/sbucket/4wzynxxmac0nvf69u89yipvgccys?response-content-disposition=inline%3B%20filename%3D%22sample%20%25281%2529.pdf%22%3B%20filename%2A%3DUTF-8%27%27sample%2520%25281%2529.pdf&response-content-type=application%2Fpdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230308%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230308T074255Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=3c6723a5d87beb631bebe99dadd2fc97f1408e97eece09f436290b1b9beaabeb",
  },
};

export const mockDataType = {
  id: "8",
  type: "file",
  attributes: {
    title: "test 2",
    summary: "test ",
    created_by: "37",
    created_at: "2023-03-06T08:03:54.222Z",
    updated_at: "2023-03-06T13:39:05.428Z",
    allow_publish: false,
    is_active: true,
    resume:
      "https://minio.b294805.dev.eastus.az.svc.builder.cafe/sbucket/y1wr50jqu6tj5d5w5gyr7vmyf6iy?response-content-disposition=inline%3B%20filename%3D%22sample%20%25283%2529.pdf%22%3B%20filename%2A%3DUTF-8%27%27sample%2520%25283%2529.pdf&response-content-type=application%2Fpdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=hello%2F20230308%2Fbuilder-1%2Fs3%2Faws4_request&X-Amz-Date=20230308T105521Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=773436ea5b3e852385b22006ec9ec64ab7cdcd70187cb7838ec2c083f3459c6b",
  },
};

export const mockResponseUpdate = {
  success: {
    meta: {
      token:
        "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzcsImV4cCI6MTY3NzE0MDIxNywidG9rZW5fdHlwZSI6ImxvZ2luIn0.W3noo4dQNDwUnKxRL65QAbq6Qv6stusMuunfs50-Lr9ub44wPXO5_Mmr3aLK_S2Kd_bjW9L6dLVDoUgkvWgbsw",
      refresh_token:
        "eyJhbGciOiJIUzUxMiJ9.eyJpZCI6MzcsImV4cCI6MTcwODU4OTgxNywidG9rZW5fdHlwZSI6InJlZnJlc2gifQ.58MIK8ptBog4ufHL4Xlql3o74LjGUWEhbAUz7u_UBdd6eTUY2k0a6B3xGYPogJZHC_kfKbuSb-CErhOZ7sssDA",
      id: 37,
    },
  },
  error: { error: "something went wrong" },
  getCandidatesSuccess: {
    data: mockData,
  },
  getCandidatesSuccess1: {
    data: { ...mockData, attributes: null },
  },
  getCandidatesSuccess2: {
    data: null,
  },
  getResumes: {
    data: [
      mockDataType,
      {
        ...mockDataType,
        attributes: {
          ...mockDataType.attributes,
          allow_publish: true,
          is_active: false,
        },
      },
    ],
  },
  successMessage: {
    message: "Item deleted successfully",
  },
  title: "test 1",
  fileReponse: [
    {
      fileCopyUri: null,
      name: "sample (1) (2).pdf",
      size: 3028,
      type: "application/pdf",
      uri: "content://com.android.providers.media.documents/document/document%3A1000000019",
    },
  ],
};

export const mockProps: ButtonProps = {
  buttonText: "submit",
  icons: "black-mesa",
  onPress: jest.fn(),
  testID: "test-id",
};

export const mockProps1: ButtonProps = {
  ...mockProps,
  fontSize: 10,
  backgroundColor: "red",
  width: 10,
  height: 10,
};
