// src/lib/blocks/registry.ts
// TypeScript Block component registry (edX XBlock-inspired)
// Closes #12

import { ComponentType } from "react";
import { ContentBlock, BlockType } from "../models";

/**
 * BlockView defines what a block component must implement.
 * Inspired by edX XBlock student_view() / studio_view().
 */
export interface BlockViewProps {
  /** The block data */
  block: ContentBlock;
  /** Current user ID */
  userId: string;
  /** Callback when a scored event occurs */
  onScore?: (earned: number, possible: number) => void;
  /** Callback when block is completed */
  onComplete?: () => void;
  /** Whether in read-only mode */
  readOnly?: boolean;
}

/**
 * BlockRegistration defines how a block type is registered.
 */
export interface BlockRegistration {
  /** Block type identifier */
  type: BlockType;
  /** Display name for this block type */
  displayName: string;
  /** React component for student view */
  studentView: ComponentType<BlockViewProps>;
  /** React component for editor/studio view (optional) */
  studioView?: ComponentType<BlockViewProps>;
  /** Icon name for the block type */
  icon: string;
  /** Whether this block type can contain children */
  hasChildren: boolean;
  /** Whether this block type is scorable */
  isScorable: boolean;
}

/**
 * BlockRegistry manages all registered block types.
 * Singleton pattern - one registry per app.
 */
class BlockRegistry {
  private blocks = new Map<BlockType, BlockRegistration>();

  /**
   * Register a new block type.
   */
  register(registration: BlockRegistration): void {
    if (this.blocks.has(registration.type)) {
      console.warn(`Block type "${registration.type}" is already registered. Overwriting.`);
    }
    this.blocks.set(registration.type, registration);
  }

  /**
   * Get registration for a block type.
   */
  get(type: BlockType): BlockRegistration | undefined {
    return this.blocks.get(type);
  }

  /**
   * Get the student view component for a block type.
   */
  getStudentView(type: BlockType): ComponentType<BlockViewProps> | undefined {
    return this.blocks.get(type)?.studentView;
  }

  /**
   * Get the studio view component for a block type.
   */
  getStudioView(type: BlockType): ComponentType<BlockViewProps> | undefined {
    return this.blocks.get(type)?.studioView;
  }

  /**
   * Check if a block type is registered.
   */
  has(type: BlockType): boolean {
    return this.blocks.has(type);
  }

  /**
   * Get all registered block types.
   */
  getAll(): BlockRegistration[] {
    return Array.from(this.blocks.values());
  }

  /**
   * Get all scorable block types.
   */
  getScorableTypes(): BlockType[] {
    return this.getAll()
      .filter((b) => b.isScorable)
      .map((b) => b.type);
  }

  /**
   * Get all container block types (has children).
   */
  getContainerTypes(): BlockType[] {
    return this.getAll()
      .filter((b) => b.hasChildren)
      .map((b) => b.type);
  }
}

// Singleton instance
export const blockRegistry = new BlockRegistry();

/**
 * Helper to register a block type.
 */
export function registerBlock(registration: BlockRegistration): void {
  blockRegistry.register(registration);
}
