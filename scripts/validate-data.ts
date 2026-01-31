import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import { validateTimelineData } from '../lib/validator';

function main() {
  const dataPath = path.join(process.cwd(), 'public', 'data.yaml');

  if (!fs.existsSync(dataPath)) {
    console.error('❌ Error: public/data.yaml not found.');
    process.exit(1);
  }

  try {
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    const data = yaml.load(fileContents);

    console.log('🔍 Validating public/data.yaml...');
    const result = validateTimelineData(data);

    if (result.success) {
      console.log('✅ Validation successful! data.yaml is valid.');
      process.exit(0);
    } else {
      console.error('❌ Validation failed:');
      result.errors?.forEach((err) => {
        console.error(`   - ${err}`);
      });
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error reading or parsing YAML:', error);
    process.exit(1);
  }
}

main();
