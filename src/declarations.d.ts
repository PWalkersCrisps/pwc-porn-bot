declare module 'ascii-table';
declare module 'weighted-random';

interface GuildDocument {
    guildId: string;
    registeredAt: Date;
    premium: boolean;
    autoPostChannel: string;
    tagBlacklist: string[];
}


interface ProfileDocument {
    userId: string;
    registeredAt: Date;
    interactionsCreated: number;
}

interface BooruPost {
    fileUrl: string,
    id: string,
    tags: string[],
    score: number,
    source: string,
    rating: string,
    createdAt: Date,
    postView: string,
}

