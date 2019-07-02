import { Stream } from 'stream'

export interface Upload {
    filename: string
    minetype: string
    encoding: string
    createReadStream: () => Stream
}