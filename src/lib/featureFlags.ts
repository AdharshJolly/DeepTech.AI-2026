import connectToDatabase from './db';
import FeatureFlag from '@/models/FeatureFlag';

export async function isFeatureEnabled(key: string): Promise<boolean> {
  try {
    await connectToDatabase();
    const flag = await FeatureFlag.findOne({ key });
    return flag ? flag.enabled : false;
  } catch (error) {
    console.error(`Error checking feature flag ${key}:`, error);
    return false;
  }
}
