import io from 'socket.io-client';
import type { Socket } from 'socket.io-client';

interface SocketOptions {
  url?: string;
  maxReconnectAttempts?: number;
  reconnectDelay?: number;
  timeout?: number;
}

class SocketClient {
  private static instance: Socket | null = null;
  private static reconnectAttempts = 0;
  private static maxReconnectAttempts = 5;
  private static reconnectDelay = 1000;
  private static eventHandlers: Map<string, ((...args: any[]) => void)[]> = new Map();

  public static getInstance(options?: SocketOptions): Socket {
    if (!this.instance) {
      const {
        url = 'http://localhost:3002',
        maxReconnectAttempts = 5,
        reconnectDelay = 1000,
        timeout = 60000
      } = options || {};

      this.maxReconnectAttempts = maxReconnectAttempts;
      this.reconnectDelay = reconnectDelay;

      try {
        this.instance = io(url, {
          transports: ['websocket', 'polling'],
          reconnection: true,
          reconnectionAttempts: this.maxReconnectAttempts,
          reconnectionDelay: this.reconnectDelay,
          reconnectionDelayMax: 5000,
          timeout: timeout,
          autoConnect: true,
          forceNew: false
        });

        this.setupEventListeners();
      } catch (error) {
        console.error('Failed to initialize socket connection:', error);
        throw error;
      }
    }
    return this.instance;
  }

  private static setupEventListeners() {
    if (!this.instance) return;

    this.instance.on('connect', () => {
      console.log('Connected to server');
      this.reconnectAttempts = 0;
      this.triggerEventHandlers('connect');
    });

    this.instance.on('disconnect', (reason) => {
      console.log('Disconnected from server:', reason);
      this.triggerEventHandlers('disconnect', reason);
      
      if (reason === 'io server disconnect') {
        // Server initiated disconnect, try reconnecting
        this.instance?.connect();
      }
    });

    this.instance.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.triggerEventHandlers('connect_error', error);
      this.handleReconnect();
    });

    this.instance.on('reconnect', (attemptNumber) => {
      console.log(`Reconnected after ${attemptNumber} attempts`);
      this.triggerEventHandlers('reconnect', attemptNumber);
    });

    this.instance.on('reconnect_attempt', (attemptNumber) => {
      console.log(`Reconnection attempt #${attemptNumber}`);
      this.triggerEventHandlers('reconnect_attempt', attemptNumber);
    });

    this.instance.on('reconnect_failed', () => {
      console.error('Failed to reconnect after maximum attempts');
      this.triggerEventHandlers('reconnect_failed');
    });

    // Handle errors
    this.instance.on('error', (error: Error) => {
      console.error('Socket error:', error);
      this.triggerEventHandlers('error', error);
    });
  }

  private static handleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      this.triggerEventHandlers('max_reconnect_attempts');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.min(this.reconnectAttempts, 3); // Exponential backoff with max of 3x

    setTimeout(() => {
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      this.instance?.connect();
    }, delay);
  }

  public static disconnect() {
    if (this.instance) {
      this.instance.disconnect();
      this.instance = null;
      this.eventHandlers.clear();
      this.reconnectAttempts = 0;
    }
  }

  public static on(event: string, handler: (...args: any[]) => void): void {
    const handlers = this.eventHandlers.get(event) || [];
    handlers.push(handler);
    this.eventHandlers.set(event, handlers);

    // If we already have an instance, attach the handler directly
    if (this.instance) {
      this.instance.on(event, handler);
    }
  }

  public static off(event: string, handler: (...args: any[]) => void): void {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
        if (this.instance) {
          this.instance.off(event, handler);
        }
      }
    }
  }

  public static emit(event: string, ...args: any[]): void {
    if (!this.instance) {
      console.warn('Attempting to emit event without socket connection:', event);
      return;
    }
    this.instance.emit(event, ...args);
  }

  private static triggerEventHandlers(event: string, ...args: any[]) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      handlers.forEach(handler => {
        try {
          handler(...args);
        } catch (error) {
          console.error(`Error in event handler for ${event}:`, error);
        }
      });
    }
  }

  // Helper method to check connection status
  public static isConnected(): boolean {
    return this.instance?.connected || false;
  }
}

export default SocketClient;
