export type User = {
  readonly id: number
  readonly name: string
  readonly email: string
  readonly friends: readonly User['id'][]
}

const users: User[] = [
  {
    id: 1,
    name: 'Artemas Catterick',
    email: 'acatterick0@census.gov',
    friends: [6, 3, 9, 7, 8, 4],
  },
  {
    id: 2,
    name: 'Jesus Neicho',
    email: 'jneicho1@msu.edu',
    friends: [2, 5],
  },
  {
    id: 3,
    name: 'Andras Shillingford',
    email: 'ashillingford2@blogger.com',
    friends: [8, 4],
  },
  {
    id: 4,
    name: 'Xerxes Soden',
    email: 'xsoden3@twitpic.com',
    friends: [7, 2, 1],
  },
  {
    id: 5,
    name: 'Ingemar Tabb',
    email: 'itabb4@jiathis.com',
    friends: [8, 3, 1],
  },
  {
    id: 6,
    name: 'Myca Imlin',
    email: 'mimlin5@dropbox.com',
    friends: [8, 3, 4],
  },
  {
    id: 7,
    name: 'Finlay Cosley',
    email: 'fcosley6@is.gd',
    friends: [9, 7, 8, 3],
  },
  {
    id: 8,
    name: 'Kale Hearnes',
    email: 'khearnes7@parallels.com',
    friends: [8, 9],
  },
  {
    id: 9,
    name: 'Elvyn Vaudre',
    email: 'evaudre8@arstechnica.com',
    friends: [4, 5, 7],
  },
  {
    id: 10,
    name: 'Cosme Enriques',
    email: 'cenriques9@xinhuanet.com',
    friends: [5, 6, 8, 7, 2],
  },
]

export function getUser(id: User['id']): User | undefined {
  return users.find((user) => user.id === id)
}

export function getAllUsers(): readonly User[] {
  return users.slice()
}
