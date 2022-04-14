import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    const { name, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: collection['_id'], name })
  }
}
