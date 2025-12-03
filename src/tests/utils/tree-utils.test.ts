import {
  generateFlatUserMap,
  generateManagerList,
} from "@/lib/utils/tree-utils";
import { describe, expect, it } from "vitest"; 
import { testData } from "./test.data";

describe("generateManagerList functionality", () => {
  // EMPTY LIST
  it("should return an empty array for empty input", () => {
    const managersList = generateManagerList([]);
    expect(managersList).toStrictEqual([]);
  });
  // NO MANAGERS
  it("should return an empty array for when no managers exist", () => {
    const managersList = generateManagerList(
      testData.filter((t) => t.managerId != null)
    );
    expect(managersList).toStrictEqual([]);
  });
  // RETURN MANAGERS
  it("should return correct managers from test data", () => {
    const managersList = generateManagerList(testData);
    expect(managersList).toHaveLength(2);
    managersList.map((m) => {
      expect(m.managerId).toBeUndefined();
    });
  });
  // ALL USER PROPERTIES ARE ACCOUNTED FOR
  it("should preserve all user properties", () => {
    const managersList = generateManagerList(testData);
    const firstManager = managersList[0];
    expect(firstManager).toHaveProperty("id");
    expect(firstManager).toHaveProperty("email");
    expect(firstManager).toHaveProperty("firstName");
    expect(firstManager).toHaveProperty("lastName");
  });
});

describe("generateFlatUserMap functionality", () => {
  // EMPTY LIST
  it("should generate map with emprt list", () => {
    const userMap = generateFlatUserMap([]);
    expect(userMap.size).toBe(0);
  });
  // CHECK EACH ENTRY IS VALID
  it("should check all users have valid entries", () => {
    const userMap = generateFlatUserMap(testData);
    // LENGTH MATCHES
    expect(userMap.size).toBe(testData.length);
    // EVERY USER EXISTS IN MAP
    testData.forEach((user) => {
      expect(userMap.has(user.id)).toBe(true);
      const userNode = userMap.get(user.id);
      expect(userNode).toBeDefined();
      expect(userNode!.id).toBe(user.id);
      expect(userNode!.email).toBe(user.email);
      expect(userNode!.firstName).toBe(user.firstName);
      expect(userNode!.lastName).toBe(user.lastName);
      expect(userNode!.photo).toBe(user.photo);
      expect(userNode!.managerId).toBe(user.managerId);
    });
    //
  });
  // USER WITH NO REPORTS
  it("should generate empty report list for non-managers", () => {
    // NON MANAGER == testData[1]
    const nonManagerList = [testData[1]];
    const userMap = generateFlatUserMap(nonManagerList);
    const userNode = userMap.get(testData[1].id);
    expect(userNode?.reports).toHaveLength(0);
  });
  // MANAGER WITH REPORTS
  it("should generate an accurate report list for managers", () => {
    const managerId = 6272061002;
    const reports = [testData[0]];
    const userMap = generateFlatUserMap(testData);
    const userNode = userMap.get(managerId);
    expect(userNode?.reports).toHaveLength(1);
    expect(userNode?.reports[0].id).toBe(reports[0].id);
    expect(userNode?.reports[0].email).toBe(reports[0].email);
    expect(userNode?.reports[0].firstName).toBe(reports[0].firstName);
    expect(userNode?.reports[0].lastName).toBe(reports[0].lastName);
    expect(userNode?.reports[0].photo).toBe(reports[0].photo);
  });
});
