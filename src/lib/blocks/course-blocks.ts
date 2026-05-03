// src/lib/blocks/course-blocks.ts
// Course hierarchy blocks (edX CourseBlock/SequenceBlock-inspired)
// Closes #17

import {
  CourseBlock,
  ChapterBlock,
  SequentialBlock,
  VerticalBlock,
  ContentBlock,
  CoursePackage,
} from "../models/content-format";
import { CourseKey, serializeCourseKey } from "../models/keys";

/**
 * CourseTree provides navigation and traversal of the block hierarchy.
 * Replaces edX CourseBlock/SequenceBlock traversal logic.
 */
export class CourseTree {
  private blocks: Map<string, ContentBlock>;
  private rootId: string;

  constructor(coursePackage: CoursePackage) {
    this.blocks = new Map(Object.entries(coursePackage.blocks));
    this.rootId = coursePackage.rootBlockId;
  }

  /** Get the root course block */
  getRoot(): CourseBlock {
    return this.blocks.get(this.rootId) as CourseBlock;
  }

  /** Get a block by ID */
  getBlock(id: string): ContentBlock | undefined {
    return this.blocks.get(id);
  }

  /** Get all chapters */
  getChapters(): ChapterBlock[] {
    const root = this.getRoot();
    return root.children
      .map((id) => this.blocks.get(id))
      .filter((b): b is ChapterBlock => b?.type === "chapter");
  }

  /** Get sequentials for a chapter */
  getSequentials(chapterId: string): SequentialBlock[] {
    const chapter = this.blocks.get(chapterId) as ChapterBlock;
    if (!chapter || chapter.type !== "chapter") return [];
    return chapter.children
      .map((id) => this.blocks.get(id))
      .filter((b): b is SequentialBlock => b?.type === "sequential");
  }

  /** Get verticals for a sequential */
  getVerticals(sequentialId: string): VerticalBlock[] {
    const seq = this.blocks.get(sequentialId) as SequentialBlock;
    if (!seq || seq.type !== "sequential") return [];
    return seq.children
      .map((id) => this.blocks.get(id))
      .filter((b): b is VerticalBlock => b?.type === "vertical");
  }

  /** Get content blocks for a vertical */
  getVerticalChildren(verticalId: string): ContentBlock[] {
    const vert = this.blocks.get(verticalId) as VerticalBlock;
    if (!vert || vert.type !== "vertical") return [];
    return vert.children
      .map((id) => this.blocks.get(id))
      .filter((b): b is ContentBlock => b !== undefined);
  }

  /** Get breadcrumb path from root to a block */
  getBreadcrumb(blockId: string): ContentBlock[] {
    const path: ContentBlock[] = [];
    const found = this.findPath(this.rootId, blockId, path);
    return found ? path : [];
  }

  private findPath(
    currentId: string,
    targetId: string,
    path: ContentBlock[]
  ): boolean {
    const block = this.blocks.get(currentId);
    if (!block) return false;
    path.push(block);
    if (currentId === targetId) return true;

    // Check children for container blocks
    const children = this.getChildIds(block);
    for (const childId of children) {
      if (this.findPath(childId, targetId, path)) return true;
    }
    path.pop();
    return false;
  }

  /** Get child IDs for any container block */
  private getChildIds(block: ContentBlock): string[] {
    switch (block.type) {
      case "course":
      case "chapter":
      case "sequential":
      case "vertical":
        return (block as { children: string[] }).children;
      default:
        return [];
    }
  }

  /** Get all blocks of a specific type */
  getBlocksByType<T extends ContentBlock>(type: string): T[] {
    return Array.from(this.blocks.values()).filter(
      (b) => b.type === type
    ) as T[];
  }

  /** Count all blocks */
  getTotalBlockCount(): number {
    return this.blocks.size;
  }

  /** Get all graded blocks */
  getGradedBlocks(): ContentBlock[] {
    return Array.from(this.blocks.values()).filter((b) => b.graded);
  }

  /** Flatten the tree into an ordered list of leaf blocks */
  getFlatLeafList(): ContentBlock[] {
    const leaves: ContentBlock[] = [];
    this.collectLeaves(this.rootId, leaves);
    return leaves;
  }

  private collectLeaves(blockId: string, result: ContentBlock[]): void {
    const block = this.blocks.get(blockId);
    if (!block) return;
    const children = this.getChildIds(block);
    if (children.length === 0) {
      result.push(block);
    } else {
      children.forEach((id) => this.collectLeaves(id, result));
    }
  }

  /** Get next/previous sequential for navigation */
  getAdjacentSequential(
    sequentialId: string,
    direction: "next" | "prev"
  ): SequentialBlock | null {
    const allSeqs: SequentialBlock[] = [];
    for (const chapter of this.getChapters()) {
      allSeqs.push(...this.getSequentials(chapter.id));
    }
    const idx = allSeqs.findIndex((s) => s.id === sequentialId);
    if (idx === -1) return null;
    const targetIdx = direction === "next" ? idx + 1 : idx - 1;
    return allSeqs[targetIdx] ?? null;
  }
}
