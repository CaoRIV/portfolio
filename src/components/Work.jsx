import React from "react";
import { motion } from "framer-motion";
import { profile } from "../data/profile";
import { reveal, viewport } from "../animation";

function PipelineArtifact({ flow }) {
  return (
    <div className="artifact-body pipeline-artifact">
      {flow.map((step, index) => (
        <div className="artifact-node" key={step}>
          <small>{String(index + 1).padStart(2, "0")}</small>
          <strong>{step}</strong>
        </div>
      ))}
    </div>
  );
}

function ChurnArtifact({ visual }) {
  return (
    <div className="artifact-body churn-artifact">
      <div className="churn-primary">
        <small>Recall / Churn = Yes</small>
        <div className="churn-ring">
          <strong>{visual.recall}</strong>
          <span>recall</span>
        </div>
        <p>Decision threshold <strong>{visual.threshold}</strong></p>
      </div>
      <div className="churn-metrics">
        {visual.metrics.map((metric) => (
          <div key={metric.label}><small>{metric.label}</small><strong>{metric.value}</strong></div>
        ))}
      </div>
      <div className="churn-flow">
        {visual.flow.map((step, index) => (
          <div key={step}><small>{String(index + 1).padStart(2, "0")}</small><strong>{step}</strong></div>
        ))}
      </div>
    </div>
  );
}

function SentimentArtifact({ visual }) {
  return (
    <div className="artifact-body sentiment-artifact">
      <div className="sentiment-input"><small>Vietnamese review / input</small><strong>Text → features → aspect model</strong></div>
      <div className="aspect-list">
        {visual.aspects.map((aspect, index) => (
          <div key={aspect}><small>{String(index + 1).padStart(2, "0")}</small><strong>{aspect}</strong><span>aspect / sentiment</span></div>
        ))}
      </div>
      <div className="sentiment-output"><small>Output layer</small><strong>{visual.flow[3]}</strong></div>
    </div>
  );
}

function VisionArtifact({ visual }) {
  return (
    <div className="artifact-body vision-artifact">
      <div className="vision-frame">
        <div className="vision-frame-head">
          <small>Illustrative scan / model surface</small>
          <span><i aria-hidden="true" /> Model ready</span>
        </div>
        <span className="vision-corner vision-corner-nw" aria-hidden="true" />
        <span className="vision-corner vision-corner-ne" aria-hidden="true" />
        <span className="vision-corner vision-corner-sw" aria-hidden="true" />
        <span className="vision-corner vision-corner-se" aria-hidden="true" />
        <span className="scan-line" aria-hidden="true" />
        <svg className="vision-subject" viewBox="0 0 320 260" role="img" aria-label="Abstract animal recognition target">
          <path className="subject-fill" d="M78 104 60 45l58 33c13-9 27-13 42-13s29 4 42 13l58-33-18 59c13 18 19 38 17 59-4 45-44 78-99 78s-95-33-99-78c-2-21 4-41 17-59Z" />
          <path className="subject-outline" d="M78 104 60 45l58 33c13-9 27-13 42-13s29 4 42 13l58-33-18 59c13 18 19 38 17 59-4 45-44 78-99 78s-95-33-99-78c-2-21 4-41 17-59Z" />
          <path className="subject-detail" d="m82 63 8 34m148-34-8 34M115 120l26 8m64-8-26 8m-61 20 22 5m62-5-22 5m-20-62v34m-17 42 17 11 17-11m-17 11v20m0 0c-12 0-22-5-28-13m28 13c12 0 22-5 28-13M93 179l43 5m-49 13 49-5m91-13-43 5m49 13-49-5" />
          <path className="subject-eye" d="M109 139c10-8 22-8 32 0-8 10-24 10-32 0Zm70 0c10-8 22-8 32 0-8 10-24 10-32 0Z" />
        </svg>
        <div className="vision-frame-label">
          <small>Input channel</small>
          <strong>Species recognition</strong>
        </div>
      </div>
      <div className="vision-analysis">
        <div className="vision-analysis-head">
          <small>Model evidence</small>
          <strong>Classification surface</strong>
        </div>
        <div className="vision-metrics">
          <div><strong>{visual.testAccuracy}</strong><small>Test accuracy</small></div>
          <div><strong>{visual.classes}</strong><small>Species classes</small></div>
        </div>
        <div className="vision-flow">
          {visual.flow.map((step, index) => (
            <div key={step}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <strong>{step}</strong>
              <span><i aria-hidden="true" /> ready</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectArtifact({ project }) {
  const { visual } = project;
  return (
    <div className={`project-artifact artifact-${visual.kind}`}>
      <div className="artifact-head">
        <span>{visual.label} / online</span>
        <span>{project.code}</span>
      </div>
      {visual.kind === "pipeline" && <PipelineArtifact flow={visual.flow} />}
      {visual.kind === "churn" && <ChurnArtifact visual={visual} />}
      {visual.kind === "sentiment" && <SentimentArtifact visual={visual} />}
      {visual.kind === "vision" && <VisionArtifact visual={visual} />}
      <div className="artifact-foot">
        <div><small>Domain</small><strong>{project.category}</strong></div>
        <div><small>Mode</small><strong>{visual.mode}</strong></div>
        <div><small>Outcome</small><strong>{project.outcome}</strong></div>
      </div>
    </div>
  );
}

function ProjectChapter({ project, index }) {
  return (
    <motion.article
      id={project.id}
      className={`project-chapter project-${project.visual.kind} ${index % 2 ? "is-reversed" : ""}`}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={reveal}
    >
      <div className="project-copy">
        <p className="project-kicker">Deployment {project.index} / {project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <dl className="project-facts">
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Stack</dt><dd>{project.stack.join(" / ")}</dd></div>
        </dl>
        <div className="project-links">
          <a className="text-link" href={project.href} target="_blank" rel="noreferrer">
            View repository <span aria-hidden="true">↗</span>
          </a>
          {project.demoHref && (
            <a className="project-demo-link" href={project.demoHref} target="_blank" rel="noreferrer">
              Open live dashboard <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
      <ProjectArtifact project={project} />
    </motion.article>
  );
}

export function Work() {
  return (
    <section id="work" className="section-shell work-section">
      <div className="section-heading">
        <p>01 / Selected work</p>
        <h2>Systems built for real questions.</h2>
        <span>Four projects across educational RAG, applied data science, Vietnamese language understanding, and computer vision.</span>
      </div>
      <div className="project-list">
        {profile.projects.map((project, index) => <ProjectChapter project={project} index={index} key={project.id} />)}
      </div>
    </section>
  );
}
