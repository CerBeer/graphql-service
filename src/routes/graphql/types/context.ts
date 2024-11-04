import { PrismaClient } from '@prisma/client';
import { User } from './user.js';
import { Profile } from './profile.js';
import { PostQuery } from './post.js';
import { Member } from './member.js';

export type Context = {
  prisma: PrismaClient;
};

export type ID = {
  id: string,
};

export type RootObject = User | Profile | PostQuery | Member;
